import { useEffect, useState } from "react";
import {User} from "@libs/types";
import { getUsers } from "@libs/services";
import { UserDataTable } from "@libs/ui";

export function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Welcome to VW Dataflow
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    A micro-frontend architecture with React, TypeScript, and Tailwind CSS
                </p>

                {loading ? <p>Loading users...</p> : <UserDataTable data={users} />}
            </div>
        </div>
    )
}
