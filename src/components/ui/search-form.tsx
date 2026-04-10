import { Search } from 'lucide-react';
import { Input } from './input/input';

export function SearchForm({ value, onChange, className }: React.ComponentProps<typeof Input>) {
  return (
    <form className={className}>
      <div className="relative">
        <Input
          id="search"
          placeholder="Enter keywords to search..."
          className="h-[2.25rem] pl-8"
          value={value}
          onChange={onChange}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
