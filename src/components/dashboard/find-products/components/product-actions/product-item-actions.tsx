'use client';

import { Download, FolderPlus } from 'lucide-react';

export function ProductItemActions() {
  return (
    <div className="absolute right-3 bottom-3 z-1 hidden gap-2 group-hover:flex">
      <button
        type="button"
        aria-label="Add to my products"
        className="cursor-pointer rounded-full bg-white/90 p-2 text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:text-neutral-900"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <FolderPlus className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Add to import list"
        className="cursor-pointer rounded-full bg-white/90 p-2 text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:text-neutral-900"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <Download className="size-4" />
      </button>
    </div>
  );
}
