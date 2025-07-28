import { User } from '@libs/types';
import { useCallback, useState } from 'react';

export interface UserManagementState {
  // Delete dialog state
  deleteDialogOpen: boolean;
  userToDelete: User | null;

  // Edit/Add drawer state
  drawerOpen: boolean;
  userToEdit: User | null;
  drawerMode: 'add' | 'edit';
}

export interface UserManagementActions {
  openDeleteDialog: (user: User) => void;
  closeDeleteDialog: () => void;
  openAddDrawer: () => void;
  openEditDrawer: (user: User) => void;
  closeDrawer: () => void;
}

/**
 * Hook that manages UI state for user CRUD operations.
 * Separates UI state management from business logic.
 */
export function useUserManagement(): UserManagementState &
  UserManagementActions {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const openDeleteDialog = useCallback((user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  }, []);

  const openAddDrawer = useCallback(() => {
    setUserToEdit(null);
    setDrawerOpen(true);
  }, []);

  const openEditDrawer = useCallback((user: User) => {
    setUserToEdit(user);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setUserToEdit(null);
  }, []);

  const drawerMode: 'add' | 'edit' = userToEdit ? 'edit' : 'add';

  return {
    // State
    deleteDialogOpen,
    userToDelete,
    drawerOpen,
    userToEdit,
    drawerMode,

    // Actions
    openDeleteDialog,
    closeDeleteDialog,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
  };
}
