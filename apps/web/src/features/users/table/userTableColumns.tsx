import { User } from '@libs/types';
import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@libs/ui';
import { capitalize } from '@libs/utils';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

export const userTableColumns = (
  onDelete: (user: User) => void,
  onEdit?: (user: User) => void,
  onViewDetails?: (user: User) => void
): ColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <button
          className="capitalize text-primary hover:text-primary/80 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          onClick={() => onViewDetails?.(user)}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewDetails?.(user);
            }
          }}
          aria-label={`View details for ${row.getValue('name')}`}
        >
          {row.getValue('name')}
        </button>
      );
    },
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    enableSorting: true,
    cell: ({ row }) => <div>{capitalize(row.getValue('role'))}</div>,
  },
  {
    accessorKey: 'team',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team" />
    ),
    enableSorting: true,
    cell: ({ row }) => <div>{capitalize(row.getValue('team'))}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: 'equals',
    cell: ({ row }) => <div>{capitalize(row.getValue('status'))}</div>,
  },
  {
    accessorKey: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
              onClick={e => e.stopPropagation()}
              aria-label={`Open actions menu for ${user.name}`}
            >
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-32"
            aria-label={`Actions for ${user.name}`}
          >
            <DropdownMenuItem
              onClick={() => onEdit?.(user)}
              aria-label={`Edit ${user.name}`}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(user)}
              aria-label={`Delete ${user.name}`}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
