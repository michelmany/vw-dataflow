import { cn } from '@libs/utils';
import { memo } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Optimized loading spinner component with memoization
 * to prevent unnecessary re-renders.
 */
export const LoadingSpinner = memo(function LoadingSpinner({
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-b-2 border-primary',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
});

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Complete loading state component with spinner and optional message
 */
export const LoadingState = memo(function LoadingState({
  message = 'Loading...',
  size = 'md',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 py-8',
        className
      )}
    >
      <LoadingSpinner size={size} />
      {message && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
});
