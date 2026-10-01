import type { IOption, IOptionValue, ProductOptionCombo } from '@/interfaces/variants';
import { COLOR_HEX, SIZE_RANK } from '@/lib/data/variant';

export function isColorOption(title: string) {
  return ['color', 'colour', 'colors', 'colours'].includes(title.trim().toLowerCase());
}

export function colorToHex(value: string, hex?: string): string {
  if (hex) return hex;

  const key = value.trim().toLowerCase();
  if (COLOR_HEX[key]) return COLOR_HEX[key];

  const match = Object.entries(COLOR_HEX).find(([name]) => key.includes(name));
  return match?.[1] ?? '#6b7280';
}

function isNumericValue(value: string) {
  const trimmed = value.trim();
  return trimmed !== '' && Number.isFinite(Number(trimmed));
}

function sizeRank(value: string) {
  return SIZE_RANK[value.trim().toLowerCase().replace(/\s+/g, '')];
}

export function sortOptionValues(entries: IOptionValue[]) {
  if (entries.length === 0) return entries;

  const values = entries.map(entry => entry.value);

  if (values.every(isNumericValue)) {
    return [...entries].sort((a, b) => Number(a.value.trim()) - Number(b.value.trim()));
  }

  if (values.every(value => sizeRank(value) !== undefined)) {
    return [...entries].sort((a, b) => sizeRank(a.value)! - sizeRank(b.value)!);
  }

  return entries;
}

export function buildOptionsFromCombos(combos: ProductOptionCombo[]): IOption[] {
  const valuesByTitle = new Map<string, Map<string, IOptionValue>>();

  for (const combo of combos) {
    for (const option of combo) {
      if (!valuesByTitle.has(option.title)) {
        valuesByTitle.set(option.title, new Map());
      }

      const values = valuesByTitle.get(option.title)!;

      if (!values.has(option.value)) {
        values.set(option.value, {
          value: option.value,
          hex: option.hex,
        });
      }
    }
  }

  return Array.from(valuesByTitle.entries()).map(([title, values]) => ({
    title,
    values: sortOptionValues(Array.from(values.values())),
  }));
}

export function initialSelections(combos: ProductOptionCombo[]) {
  const options = buildOptionsFromCombos(combos);
  if (!options.length) return {};

  const primaryTitle = getPrimaryOptionTitle(options.map(option => option.title));
  const primaryValue = options.find(option => option.title === primaryTitle)?.values[0]?.value;
  if (!primaryTitle || !primaryValue) return {};

  const combo = pickPreferredCombo(combos, primaryTitle, primaryValue);
  if (!combo) return {};

  return Object.fromEntries(combo.map(option => [option.title, option.value]));
}

export function selectionMatchesCombo(
  combo: ProductOptionCombo,
  selection: Record<string, string>
) {
  return Object.entries(selection).every(([title, value]) =>
    combo.some(option => option.title === title && option.value === value)
  );
}

export function getPrimaryOptionTitle(optionTitles: string[]) {
  const normalized = (title: string) => title.trim().toLowerCase();

  const color = optionTitles.find(title =>
    ['color', 'colour', 'colors', 'colours'].includes(normalized(title))
  );
  if (color) return color;

  const size = optionTitles.find(title => ['size', 'sizes'].includes(normalized(title)));
  if (size) return size;

  return optionTitles[0];
}

export function isOptionValueAvailable(
  combos: ProductOptionCombo[],
  selection: Record<string, string>,
  optionTitle: string,
  value: string,
  primaryOptionTitle?: string
) {
  const valueExists = combos.some(combo =>
    combo.some(option => option.title === optionTitle && option.value === value)
  );
  if (!valueExists) return false;

  if (primaryOptionTitle && optionTitle === primaryOptionTitle) {
    return true;
  }

  const nextSelection = { ...selection, [optionTitle]: value };
  return combos.some(combo => selectionMatchesCombo(combo, nextSelection));
}

function pickPreferredCombo(combos: ProductOptionCombo[], optionTitle: string, value: string) {
  const matching = combos.filter(combo =>
    combo.some(option => option.title === optionTitle && option.value === value)
  );

  if (matching.length === 0) return undefined;
  if (matching.length === 1) return matching[0];

  const preferred: Record<string, string> = { [optionTitle]: value };
  const options = buildOptionsFromCombos(matching);

  for (const option of options) {
    if (option.title === optionTitle) continue;
    preferred[option.title] = option.values[0].value;
  }

  return matching.find(combo => selectionMatchesCombo(combo, preferred)) ?? matching[0];
}

export function resolveSelectionForOption(
  combos: ProductOptionCombo[],
  selection: Record<string, string>,
  optionTitle: string,
  value: string
) {
  const nextSelection = { ...selection, [optionTitle]: value };

  if (combos.some(combo => selectionMatchesCombo(combo, nextSelection))) {
    return nextSelection;
  }

  const match = pickPreferredCombo(combos, optionTitle, value);
  if (!match) return selection;

  return Object.fromEntries(match.map(option => [option.title, option.value]));
}

export function selectionsToQuery(selections: Record<string, string>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(selections)) {
    params.set(key.toLowerCase(), value.toLowerCase());
  }

  return params.toString();
}
