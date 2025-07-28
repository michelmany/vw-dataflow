import { User } from '@libs/types';
import { DataTable, DataTablePagination } from '@libs/ui';
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
import { memo, useMemo, useState } from 'react';
import { userTableColumns } from '../table/userTableColumns';
import { UserDeleteDialog } from './UserDeleteDialog';
import { UserDrawer } from './UserDrawer';
import { UserShowcase } from './UserShowcase';
import { UserDataTableToolbar } from './UserTableToolbar';

interface UserDataTableProps {
  data: User[];
  onDeleteUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onAddUser: () => void;
  // Dialog and drawer state
  deleteDialogOpen: boolean;
  userToDelete: User | null;
  onDeleteDialogClose: () => void;
  onConfirmDelete: () => Promise<void>;
  // Drawer state
  drawerOpen: boolean;
  userToEdit?: User;
  onDrawerClose: () => void;
  onUserSubmit: (formData: Partial<User>) => Promise<void>;
  // Showcase state
  showcaseOpen: boolean;
  userToShowcase: User | null;
  onShowcaseClose: () => void;
  onViewUserDetails: (user: User) => void;
}

// This component renders a data table for users
export const UserDataTable = memo(function UserDataTable({
  data,
  onDeleteUser,
  onEditUser,
  onAddUser,
  deleteDialogOpen,
  userToDelete,
  onDeleteDialogClose,
  onConfirmDelete,
  drawerOpen,
  userToEdit,
  onDrawerClose,
  onUserSubmit,
  showcaseOpen,
  userToShowcase,
  onShowcaseClose,
  onViewUserDetails,
}: UserDataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Memoize the global filter function to prevent recreation on each render
  const globalFilterFn = React.useCallback(
    (row: Row<User>, _columnId: string, filterValue: string) => {
      const search = filterValue.toLowerCase();
      return ['name', 'email', 'role', 'team', 'status'].some(key => {
        const value = row.getValue(key);
        return (
          typeof value === 'string' && value.toLowerCase().includes(search)
        );
      });
    },
    []
  );

  // Memoize columns to prevent recreation when handlers change
  const columns = useMemo(
    () => userTableColumns(onDeleteUser, onEditUser, onViewUserDetails),
    [onDeleteUser, onEditUser, onViewUserDetails]
  );
  const table = useReactTable({
    data,
    columns,
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
        pageSize: 10,
      },
    },
    enableRowSelection: false,
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
      <UserDataTableToolbar table={table} onAddUserClick={onAddUser} />
      <DataTable table={table} />
      <DataTablePagination table={table} />
      <UserDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogClose}
        user={userToDelete}
        onConfirm={onConfirmDelete}
      />
      <UserDrawer
        open={drawerOpen}
        onOpenChange={onDrawerClose}
        user={userToEdit}
        onSubmit={onUserSubmit}
        onUserUpdated={onDrawerClose}
      />
      <UserShowcase
        open={showcaseOpen}
        onOpenChange={onShowcaseClose}
        user={userToShowcase}
      />
    </div>
  );
});
