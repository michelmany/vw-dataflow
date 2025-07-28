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

export const UserShowcase = React.memo(
  ({ user, open, onOpenChange }: UserShowcaseProps) => {
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
        <DrawerContent
          className={`flex flex-col overflow-hidden ${
            isMobile ? 'max-h-[85vh]' : ''
          }`}
          aria-labelledby="user-showcase-title"
          aria-describedby="user-showcase-description"
        >
          <DrawerHeader className="border-b border-border pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={`Profile picture of ${user.name}`}
                  className="w-16 h-16 rounded-full border shadow-sm"
                />
                <div>
                  <DrawerTitle
                    id="user-showcase-title"
                    className="text-xl font-semibold text-foreground"
                  >
                    {user.name}
                  </DrawerTitle>
                  <DrawerDescription
                    id="user-showcase-description"
                    className="text-muted-foreground mt-1"
                  >
                    Detailed user information
                  </DrawerDescription>
                </div>
              </div>
              <DrawerClose
                className="p-2 rounded-md hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Close ${user.name}'s details`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </DrawerClose>
            </div>
          </DrawerHeader>

          <section
            className="flex-1 overflow-y-auto p-6"
            aria-label="User details"
          >
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
                <dd className="text-foreground font-medium">{user.role}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground mb-1">
                  Team
                </dt>
                <dd className="text-foreground font-medium">{user.team}</dd>
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
                    role="status"
                    aria-label={`User status: ${user.status}`}
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
                  <time dateTime={user.createdAt}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </dd>
              </div>
            </dl>
          </section>
        </DrawerContent>
      </Drawer>
    );
  }
);
