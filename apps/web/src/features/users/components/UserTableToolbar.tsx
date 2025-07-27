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
import { useNavigate } from 'react-router-dom';
import { userFilters, type UserFilter } from '../table/userFilters';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UserDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          id="search"
          placeholder="Search name or email..."
          value={table.getState().globalFilter ?? ''}
          onChange={event => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex items-center gap-2">
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
                  >
                    <FunnelIcon className="h-3 w-3" />
                    {value ? `${filter.label}: ${value}` : filter.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {filter.options.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => column?.setFilterValue(option.value)}
                      className="capitalize"
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
            >
              Reset
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <Button
        variant="default"
        size="sm"
        onClick={() => navigate('/users/create')}
      >
        Add User
      </Button>
    </div>
  );
}
