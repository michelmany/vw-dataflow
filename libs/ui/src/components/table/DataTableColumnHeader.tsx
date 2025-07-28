import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';
import * as React from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@libs/ui';
import { cn } from '@libs/utils';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sortDirection = column.getIsSorted();
  const sortLabel =
    sortDirection === 'asc'
      ? `${title} sorted ascending`
      : sortDirection === 'desc'
      ? `${title} sorted descending`
      : `Sort ${title}`;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
            aria-label={sortLabel}
            aria-describedby={`${title.toLowerCase()}-sort-description`}
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          aria-label={`Sort and filter options for ${title}`}
        >
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            aria-label={`Sort ${title} in ascending order`}
          >
            <ArrowUp className="mr-2 h-3 w-3" aria-hidden="true" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            aria-label={`Sort ${title} in descending order`}
          >
            <ArrowDown className="mr-2 h-3 w-3" aria-hidden="true" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            aria-label={`Hide ${title} column`}
          >
            <EyeOff className="mr-2 h-3 w-3" aria-hidden="true" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span id={`${title.toLowerCase()}-sort-description`} className="sr-only">
        {sortDirection
          ? `Currently sorted ${
              sortDirection === 'asc' ? 'ascending' : 'descending'
            }`
          : 'Not sorted'}
      </span>
    </div>
  );
}
