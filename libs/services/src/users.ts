import {User} from "@libs/types";

/**
 * Fetches a list of users.
 *
 * @return {Promise<Array>} A promise that resolves to an array of users.
 * @throws {Error} If the request fails.
 * @param id
 */
export async function getUserById(id: string): Promise<User> {
    const response = await fetch(`http://localhost:3001/api/users/${id}`);
    if (!response.ok) {
        throw new Error("User not found");
    }
    return response.json();
}

export async function getUsers(): Promise<User[]> {
    const response = await fetch(`http://localhost:3001/api/users`);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
}
