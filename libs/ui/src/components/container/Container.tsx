import { cn } from '@libs/utils';
import { forwardRef } from 'react';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
