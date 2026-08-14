'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { ImportProductButtonProps } from '@/interfaces/product';
import { cn } from '@/lib/utils/shared/class-merge';

export default function ImportProductButton({ className }: ImportProductButtonProps) {
  return (
    <Button
      onClick={() => {}}
      className={cn('bg-primary hover:bg-primary/90', className)}
      // disabled={product.stock === 0}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Import to Shopify
      {/* {product.stock === 0 ? "Out of Stock" : "Import to Shopify"} */}
    </Button>
  );
}
