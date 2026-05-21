'use client';

import { Copy } from 'lucide-react';
import React from 'react';

export const ProductItemCopy = ({ title }: { title: string }) => {
  return (
    <button
      type="button"
      className="relative z-1 block shrink-0 cursor-pointer transition-all duration-300 hover:scale-110"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(title);
      }}
    >
      <Copy className="size-5" />
    </button>
  );
};
