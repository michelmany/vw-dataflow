import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from '@libs/ui';
import { Table } from '@tanstack/react-table';
import { FunnelIcon, X } from 'lucide-react';
import { userFilters, type UserFilter } from '../table/userFilters';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddUserClick?: () => void;
}

export function UserDataTableToolbar<TData>({
  table,
  onAddUserClick,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-2">
        <Input
          id="search"
          placeholder="Search users..."
          value={table.getState().globalFilter ?? ''}
          onChange={event => table.setGlobalFilter(event.target.value)}
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
          aria-label="Search users by name, email, or other attributes"
        />

        <div
          className="flex items-center gap-2 w-full sm:w-auto"
          role="group"
          aria-label="Filter controls"
        >
          {userFilters.map((filter: UserFilter) => {
            const column = table.getColumn(filter.columnKey);
            const value = column?.getFilterValue() as string;

            return (
              <DropdownMenu key={filter.columnKey}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 border-dashed"
                    aria-label={
                      value
                        ? `Filter by ${filter.label}: ${value}. Click to change.`
                        : `Filter by ${filter.label}`
                    }
                  >
                    <FunnelIcon className="h-3 w-3" aria-hidden="true" />
                    {value ? `${filter.label}: ${value}` : filter.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  aria-label={`${filter.label} filter options`}
                >
                  {filter.options.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => column?.setFilterValue(option.value)}
                      className="capitalize"
                      aria-label={`Filter by ${option.label}`}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.resetColumnFilters()}
              aria-label="Clear all filters"
            >
              Reset
              <X className="w-4 h-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
      <Button
        variant="default"
        size="sm"
        onClick={onAddUserClick}
        aria-label="Add new user to the system"
      >
        Add User
      </Button>
    </div>
  );
}
