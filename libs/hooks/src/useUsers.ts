import {
  createUser as createUserService,
  deleteUser as deleteUserService,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
} from '@libs/services';
import { User } from '@libs/types';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { fetchUsersAtom, usersAtom, usersLoadedAtom } from './atoms/users';

/**
 * Custom hook to manage user state and API interactions.
 * Wraps atom usage and handles fetching and syncing.
 */
export function useUsers() {
  const [users, setUsers] = useAtom(usersAtom);
  const [usersLoaded] = useAtom(usersLoadedAtom);
  const [, triggerFetch] = useAtom(fetchUsersAtom);

  // Fetch users on mount only if not already loaded
  useEffect(() => {
    if (!usersLoaded) {
      triggerFetch();
    }
  }, [usersLoaded]); // Remove triggerFetch from dependencies

  const refetchUsers = useCallback(async () => {
    await triggerFetch();
  }, [triggerFetch]);

  async function addUser(newUser: Partial<User>) {
    try {
      const created = await createUserService(newUser);
      setUsers([...users, created]);
      return created;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  async function editUser(id: number, updates: Partial<User>) {
    try {
      const updated = await updateUserService(id, updates);
      setUsers(users.map(u => (u.id === id ? updated : u)));
      return updated;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

  async function removeUser(id: number) {
    try {
      await deleteUserService(id);
      setUsers(users.filter(u => u.id !== Number(id)));
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }

  async function getUserById(id: number) {
    try {
      return await getUserByIdService(id);
    } catch (error) {
      console.error('Failed to fetch user by ID:', error);
      throw error;
    }
  }

  return {
    users,
    getUserById,
    addUser,
    editUser,
    removeUser,
    refetch: refetchUsers,
  };
}
