import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ProductOptionCombo } from '@/interfaces/product';
import {
  buildOptionsFromCombos,
  getPrimaryOptionTitle,
  isOptionValueAvailable,
  resolveSelectionForOption,
  selectionsToQuery,
} from '@/lib/utils/dashboard/product';

export function useProductVariantOptions(
  combos: ProductOptionCombo[],
  selection: Record<string, string>
) {
  const [selected, setSelected] = useState<Record<string, string>>(selection);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const options = buildOptionsFromCombos(combos);
  const primaryOptionTitle = getPrimaryOptionTitle(options.map(option => option.title));

  useEffect(() => {
    setSelected(selection);
  }, [selection]);

  const isValueAvailable = (optionTitle: string, value: string) =>
    isOptionValueAvailable(combos, selected, optionTitle, value, primaryOptionTitle);

  const selectValue = (optionTitle: string, value: string) => {
    if (isPending || selected[optionTitle] === value) return;
    if (!isValueAvailable(optionTitle, value)) return;

    const nextSelection = resolveSelectionForOption(combos, selected, optionTitle, value);
    setSelected(nextSelection);

    const query = selectionsToQuery(nextSelection);
    startTransition(() => {
      router.replace(`${pathname}?${query}`, { scroll: false });
    });
  };

  return {
    options,
    selected,
    isPending,
    isValueAvailable,
    selectValue,
  };
}
