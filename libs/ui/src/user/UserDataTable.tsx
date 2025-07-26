import {ColumnDef} from "@tanstack/react-table";
import {User} from "@libs/types";
import {Button} from "@libs/ui";
import {DataTable} from "@libs/ui";

interface UserDataTableProps {
    data: User[];
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "team",
        header: "Team",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original;
            return (
                <Button
                    variant="link"
                    onClick={() => (window.location.href = `/user/${user.id}`)}
                >
                    View
                </Button>
            );
        },
    },
];

export function UserDataTable({data}: UserDataTableProps) {
    return <DataTable columns={columns} data={data}/>;
}
