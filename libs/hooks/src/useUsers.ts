import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '@libs/services/';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { usersAtom } from './atoms/users';

/**
 * Custom hook to manage user state and API interactions.
 * Wraps atom usage and handles fetching and syncing.
 */
export function useUsers() {
  const [users, setUsers] = useAtom(usersAtom);

  // Fetch users on mount and populate the atom
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
    fetchUsers();
  }, [setUsers]);

  return {
    users,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    refetch: async () => {
      const data = await getUsers();
      setUsers(data);
    },
  };
}
