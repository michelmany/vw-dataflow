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
import { UserForm } from './UserForm';

interface UserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSubmit?: (data: Partial<User>) => void;
}

export function UserDrawer({
  open,
  onOpenChange,
  user,
  onSubmit,
}: UserDrawerProps) {
  const isMobile = useIsMobile();

  const handleFormSubmit = (data: Partial<User>) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log('Submitted data', data); // fallback for now
    }
    onOpenChange(false);
  };

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
            onSubmit={handleFormSubmit}
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
