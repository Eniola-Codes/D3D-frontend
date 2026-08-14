import * as React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils/shared/class-merge';
import { buttonVariants, type Button } from '@/components/ui/button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  href?: React.ComponentProps<typeof Link>['href'];
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  Omit<React.ComponentProps<typeof Link>, 'href'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  href,
  ...props
}: PaginationLinkProps) {
  const linkClassName = cn(
    buttonVariants({
      variant: isActive ? 'default' : 'ghost',
      size,
    }),
    className
  );

  if (!href) {
    return (
      <span
        aria-current={isActive ? 'page' : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        className={linkClassName}
        {...props}
      />
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={linkClassName}
      {...props}
    />
  );
}

type PaginationNavProps = PaginationLinkProps & {
  disabled?: boolean;
};

function PaginationPrevious({ className, disabled, href, ...props }: PaginationNavProps) {
  return (
    <PaginationLink
      href={disabled ? undefined : href}
      aria-label="Go to previous page"
      aria-disabled={disabled}
      size="default"
      className={cn('gap-1 px-2 sm:pl-2', disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, disabled, href, ...props }: PaginationNavProps) {
  return (
    <PaginationLink
      href={disabled ? undefined : href}
      aria-label="Go to next page"
      aria-disabled={disabled}
      size="default"
      className={cn('gap-1 px-2 sm:pr-2', disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
