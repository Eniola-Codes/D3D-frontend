'use client';

import type { ProductVariantOptionsProps } from '@/interfaces/product';
import { cn } from '@/lib/utils/shared/class-merge';
import { colorToHex, isColorOption } from '@/lib/utils/dashboard/product';
import { useProductVariantOptions } from '@/components/dashboard/products/hooks/use-product-variant-options';

export default function ProductVariantOptions({
  options: combos,
  selection,
}: ProductVariantOptionsProps) {
  const { options, selected, isPending, isValueAvailable, selectValue } = useProductVariantOptions(
    combos,
    selection
  );

  if (options.length === 0) return null;

  return (
    <div className="space-y-6">
      {options.map(option => {
        const selectedValue = selected[option.title] ?? option.values[0];
        const showSwatches = isColorOption(option.title);

        return (
          <div key={option.title} className="space-y-3">
            <p className="text-sm font-medium">
              {option.title}
              {selectedValue ? (
                <span className="text-muted-foreground ml-2 font-normal">{selectedValue}</span>
              ) : null}
            </p>

            {showSwatches ? (
              <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={option.title}>
                {option.values.map(value => {
                  const isSelected = value === selectedValue;
                  const isAvailable = isValueAvailable(option.title, value);
                  const hex = colorToHex(value);

                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={!isAvailable || isPending || isSelected}
                      disabled={!isAvailable || isPending || isSelected}
                      aria-label={value}
                      title={value}
                      onClick={() => selectValue(option.title, value)}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full transition-shadow',
                        !isAvailable && 'cursor-not-allowed opacity-30',
                        isPending && isAvailable && 'pointer-events-none opacity-60',
                        isAvailable &&
                          !isSelected &&
                          'hover:ring-muted-foreground/40 cursor-pointer hover:ring-1 hover:ring-offset-1',
                        isSelected && 'ring-foreground cursor-pointer ring-1 ring-offset-2'
                      )}
                    >
                      <span
                        className="border-border h-7 w-7 rounded-full border"
                        style={{ backgroundColor: hex }}
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={option.title}>
                {option.values.map(value => {
                  const isSelected = value === selectedValue;
                  const isAvailable = isValueAvailable(option.title, value);

                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-disabled={!isAvailable || isPending || isSelected}
                      disabled={!isAvailable || isPending || isSelected}
                      onClick={() => selectValue(option.title, value)}
                      className={cn(
                        'min-w-12 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors',
                        !isAvailable &&
                          'border-border/50 text-muted-foreground/40 cursor-not-allowed line-through',
                        isPending && isAvailable && 'pointer-events-none opacity-60',
                        isAvailable &&
                          !isSelected &&
                          'border-border bg-background text-foreground hover:bg-muted cursor-pointer',
                        isSelected && 'cursor-pointer border-black bg-black text-white'
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
