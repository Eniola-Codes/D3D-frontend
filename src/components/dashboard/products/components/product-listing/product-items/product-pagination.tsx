import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ProductListPagination } from '@/interfaces/product';
import { buildProductsPageUrl, getPaginationRange } from '@/lib/utils/dashboard/product';

export function ProductPagination({
  pagination,
  searchParams,
}: {
  pagination: ProductListPagination;
  searchParams: URLSearchParams;
}) {
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPaginationRange(currentPage, totalPages).filter(
    item => item !== 'ellipsis' || totalPages > 3
  );
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <Pagination className="mx-auto pb-5 lg:pb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildProductsPageUrl(searchParams, currentPage - 1)}
            disabled={!hasPrevious}
          />
        </PaginationItem>
        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href={buildProductsPageUrl(searchParams, item)}
                isActive={item === currentPage}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={buildProductsPageUrl(searchParams, currentPage + 1)}
            disabled={!hasNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
