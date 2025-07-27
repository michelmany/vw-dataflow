import { User } from '@libs/types';
import { DataTable } from '@libs/ui';
import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { useState } from 'react';
import { userTableColumns } from '../table/userTableColumns';
import { UserDataTableToolbar } from './UserTableToolbar';

interface UserDataTableProps {
  data: User[];
}

// This component renders a data table for users
export function UserDataTable({ data }: UserDataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const globalFilterFn = (
    row: Row<User>,
    _columnId: string,
    filterValue: string
  ) => {
    const name = row.getValue('name') as string;
    const email = row.getValue('email') as string;

    return (
      name?.toLowerCase().includes(filterValue.toLowerCase()) ||
      email?.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns: userTableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn,
  });

  return (
    <div className="flex flex-col gap-4">
      <UserDataTableToolbar table={table} />
      <DataTable table={table} />
    </div>
  );
}
