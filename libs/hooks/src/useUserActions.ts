import { User } from '@libs/types';
import { useCallback } from 'react';

interface UserActionsProps {
  addUser: (userData: Partial<User>) => Promise<User>;
  editUser: (id: number, userData: Partial<User>) => Promise<User>;
  removeUser: (id: number) => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Custom hook that provides user action handlers.
 * Separates business logic from UI components.
 * Takes the base user operations as parameters to avoid multiple useUsers() calls.
 */
export function useUserActions({
  addUser,
  editUser,
  removeUser,
  refetch,
}: UserActionsProps) {
  const handleAddUser = useCallback(
    async (userData: Partial<User>) => {
      const result = await addUser(userData);
      return result;
    },
    [addUser]
  );

  const handleEditUser = useCallback(
    async (id: number, userData: Partial<User>) => {
      const result = await editUser(id, userData);
      return result;
    },
    [editUser]
  );

  const handleDeleteUser = useCallback(
    async (id: number) => {
      await removeUser(id);
      await refetch();
    },
    [removeUser, refetch]
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleRefresh,
  };
}
