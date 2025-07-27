import {User} from "@libs/types";

interface UserShowcaseProps {
    user: User;
}

export function UserShowcase({user}: UserShowcaseProps) {
    return (
        <div className="flex items-center gap-6">
            <img
                src={user.avatar}
                alt={`Avatar of ${user.name}`}
                className="w-24 h-24 rounded-full border shadow"
            />
            <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-2">
                    <span className="font-medium">Role:</span> {user.role}
                </p>
                <p>
                    <span className="font-medium">Team:</span> {user.team}
                </p>
                <p>
                    <span className="font-medium">Status:</span> {user.status}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Created at: {new Date(user.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
