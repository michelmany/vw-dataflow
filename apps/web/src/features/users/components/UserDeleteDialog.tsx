import { User } from '@libs/types';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@libs/ui';

interface UserDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onConfirm: (user: User) => void;
}

export function UserDeleteDialog({
  open,
  onOpenChange,
  user,
  onConfirm,
}: UserDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="delete-dialog-description">
        <DialogHeader className="mb-5">
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <p id="delete-dialog-description">
          Are you sure you want to delete{' '}
          <span className="font-semibold">{user?.name}</span>? This action
          cannot be undone.
        </p>
        <DialogFooter className="mt-5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            aria-label="Cancel user deletion"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => user && onConfirm(user)}
            aria-label={`Confirm deletion of ${user?.name}`}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
