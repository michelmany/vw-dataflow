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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{user ? 'Edit User' : 'Add User'}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4">
          <UserForm
            initialData={user}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
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
});
