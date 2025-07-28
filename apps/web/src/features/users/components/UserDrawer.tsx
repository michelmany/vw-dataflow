import { useIsMobile } from '@libs/hooks';
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
import { memo, useCallback } from 'react';
import { UserForm } from './UserForm';

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSubmit?: (formData: Partial<User>) => Promise<void>;
  onUserUpdated?: () => void;
}

export const UserDrawer = memo(function UserDrawer({
  open,
  onOpenChange,
  user,
  onSubmit,
  onUserUpdated,
}: UserDrawerProps) {
  const isMobile = useIsMobile();

  const handleSubmit = useCallback(
    async (formData: Partial<User>) => {
      try {
        await onSubmit?.(formData);
        onUserUpdated?.();
        onOpenChange(false);
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    },
    [onSubmit, onUserUpdated, onOpenChange]
  );

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent
        aria-labelledby="user-drawer-title"
        aria-describedby="user-drawer-description"
      >
        <DrawerHeader>
          <DrawerTitle id="user-drawer-title">
            {user ? 'Edit User' : 'Add User'}
          </DrawerTitle>
          <div id="user-drawer-description" className="sr-only">
            {user
              ? `Form to edit user information for ${user.name}`
              : 'Form to add a new user to the system'}
          </div>
        </DrawerHeader>
        <div
          className="flex flex-col gap-4 overflow-y-auto px-4"
          role="region"
          aria-label="User form content"
        >
          <UserForm
            initialData={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
        <DrawerFooter className="flex flex-col gap-2">
          <Button
            type="submit"
            form="user-form"
            aria-label={
              user ? `Update ${user.name}'s information` : 'Save new user'
            }
          >
            {user ? 'Update' : 'Save'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" aria-label="Cancel and close form">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});
