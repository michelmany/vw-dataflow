import { Button } from '@libs/ui';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  return (
    <nav
      className="flex items-center justify-between px-2 py-2"
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="text-sm text-muted-foreground" aria-live="polite">
        Showing {startRow} to {endRow} of {totalRows} results (Page{' '}
        {currentPage} of {totalPages})
      </div>
      <div className="space-x-2" role="group" aria-label="Pagination controls">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label={`Go to previous page (page ${currentPage - 1})`}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label={`Go to next page (page ${currentPage + 1})`}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
