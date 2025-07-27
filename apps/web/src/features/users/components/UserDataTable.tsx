import { User } from '@libs/types';
import { DataTable } from '@libs/ui';
import { userTableColumns } from '../table/userTableColumns';

interface UserDataTableProps {
  data: User[];
}

// const columns: ColumnDef<User>[] = [
//   {
//     accessorKey: 'name',
//     header: 'Name',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'email',
//     header: 'Email',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'role',
//     header: 'Role',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'team',
//     header: 'Team',
//     enableSorting: true,
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     enableSorting: true,
//   },
//   {
//     id: 'actions',
//     cell: ({ row }) => {
//       const user = row.original;
//       return (
//         <Button
//           variant="link"
//           onClick={() => (window.location.href = `/user/${user.id}`)}
//         >
//           View
//         </Button>
//       );
//     },
//   },
// ];

// This component renders a data table for users
export function UserDataTable({ data }: UserDataTableProps) {
  return <DataTable columns={userTableColumns} data={data} />;
}
