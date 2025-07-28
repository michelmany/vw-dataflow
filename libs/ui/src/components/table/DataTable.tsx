import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

import { flexRender, Table as TableType } from '@tanstack/react-table';

interface DataTableProps<TData> {
  table: TableType<TData>;
}

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <div
      className="rounded-md border bg-white shadow-sm"
      role="region"
      aria-label="Data table"
      data-prevent-focus="true"
    >
      <Table
        role="table"
        aria-label="Users data table"
        data-prevent-focus="true"
      >
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className="text-sm text-muted-foreground"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-left"
                role="cell"
                aria-live="polite"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
