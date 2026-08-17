import { FileText } from 'lucide-react';

interface ProductTabEmptyStateProps {
  message: string;
}

export default function ProductTabEmptyState({ message }: ProductTabEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed px-4 py-10 text-center">
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
        <FileText className="text-muted-foreground h-5 w-5" />
      </div>
      <p>{message}</p>
    </div>
  );
}
