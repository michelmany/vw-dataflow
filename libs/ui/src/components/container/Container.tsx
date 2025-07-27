import { cn } from '@libs/utils';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
}
