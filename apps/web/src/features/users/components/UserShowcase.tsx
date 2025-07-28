import React from 'react';
import { User } from '@libs/types';
import { useIsMobile } from '@libs/hooks';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@libs/ui';
import { X } from 'lucide-react';

interface UserShowcaseProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserShowcase = React.memo(({ user, open, onOpenChange }: UserShowcaseProps) => {
  const isMobile = useIsMobile();

  if (!user) {
    return null;
  }

  return (
    <Drawer 
      open={open} 
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent className={`flex flex-col overflow-hidden ${isMobile ? 'max-h-[85vh]' : ''}`}>
        <DrawerHeader className="border-b border-border pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={`Avatar of ${user.name}`}
                className="w-16 h-16 rounded-full border shadow-sm"
              />
              <div>
                <DrawerTitle className="text-xl font-semibold text-foreground">
                  {user.name}
                </DrawerTitle>
                <DrawerDescription className="text-muted-foreground mt-1">
                  User Details
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose
              className="p-2 rounded-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <dl className="space-y-6">
            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Email Address
              </dt>
              <dd className="text-foreground font-medium break-all">
                {user.email}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Role
              </dt>
              <dd className="text-foreground font-medium">
                {user.role}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Team
              </dt>
              <dd className="text-foreground font-medium">
                {user.team}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </dt>
              <dd className="text-foreground font-medium">
                <span 
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  {user.status}
                </span>
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted-foreground mb-1">
                Created Date
              </dt>
              <dd className="text-foreground font-medium">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
          </dl>
        </div>
      </DrawerContent>
    </Drawer>
  );
});
