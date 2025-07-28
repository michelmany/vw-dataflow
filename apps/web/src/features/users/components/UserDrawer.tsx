import { useIsMobile, useUsers } from '@libs/hooks';
import { User } from '@libs/types';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@libs/ui';
import { UserForm } from './UserForm';

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
}

export function UserDrawer({ open, onOpenChange, user }: UserDrawerProps) {
  const isMobile = useIsMobile();
  const { addUser, editUser, refetch } = useUsers();

  async function handleSubmit(formData: Partial<User>) {
    try {
      if (user) {
        await editUser(user.id, formData);
      } else {
        await addUser(formData);
      }
      await refetch();
      onOpenChange(false);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{user ? 'Edit User' : 'Add User'}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4">
          <UserForm
            initialData={user}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
        <DrawerFooter className="flex flex-col gap-2">
          <Button type="submit" form="user-form">
            {user ? 'Update' : 'Save'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
