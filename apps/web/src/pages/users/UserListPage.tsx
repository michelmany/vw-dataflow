import { useUserActions, useUserManagement, useUsers } from '@libs/hooks';
import { User } from '@libs/types';
import { Container } from '@libs/ui';
import { UserDataTable } from '../../features/users/components/UserDataTable';

function UserListPage() {
  const { users, addUser, editUser, removeUser, refetch } = useUsers();
  const { handleAddUser, handleEditUser, handleDeleteUser } = useUserActions({
    addUser,
    editUser,
    removeUser,
    refetch,
  });
  const {
    deleteDialogOpen,
    userToDelete,
    drawerOpen,
    userToEdit,
    drawerMode,
    showcaseOpen,
    userToShowcase,
    openDeleteDialog,
    closeDeleteDialog,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    openShowcase,
    closeShowcase,
  } = useUserManagement();

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id);
      closeDeleteDialog();
    }
  };

  const handleUserSubmit = async (formData: Partial<User>) => {
    if (drawerMode === 'edit' && userToEdit) {
      await handleEditUser(userToEdit.id, formData);
    } else {
      await handleAddUser(formData);
    }
  };

  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-4xl text-center font-bold text-gray-900 mb-8">
          Welcome to VW Dataflow
        </h1>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">Users</h2>
        </div>
      </header>

      <section aria-label="User management interface">
        <UserDataTable
          data={users}
          onDeleteUser={openDeleteDialog}
          onEditUser={openEditDrawer}
          onAddUser={openAddDrawer}
          deleteDialogOpen={deleteDialogOpen}
          userToDelete={userToDelete}
          onDeleteDialogClose={closeDeleteDialog}
          onConfirmDelete={handleConfirmDelete}
          drawerOpen={drawerOpen}
          userToEdit={userToEdit || undefined}
          onDrawerClose={closeDrawer}
          onUserSubmit={handleUserSubmit}
          showcaseOpen={showcaseOpen}
          userToShowcase={userToShowcase}
          onShowcaseClose={closeShowcase}
          onViewUserDetails={openShowcase}
        />
      </section>
    </Container>
  );
}

export default UserListPage;
