import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@libs/utils';

function Drawer(props: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root {...props} />;
}

function DrawerTrigger(
  props: React.ComponentProps<typeof DrawerPrimitive.Trigger>
) {
  return <DrawerPrimitive.Trigger {...props} />;
}

function DrawerPortal(
  props: React.ComponentProps<typeof DrawerPrimitive.Portal>
) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerClose(
  props: React.ComponentProps<typeof DrawerPrimitive.Close>
) {
  return <DrawerPrimitive.Close {...props} />;
}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out fixed inset-0 z-50 bg-black/50',
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      role="dialog"
      aria-modal="true"
      className={cn(
        'group/drawer bg-background fixed z-50 flex flex-col focus:outline-none',
        'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=top]:h-auto',
        'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=bottom]:h-auto',
        'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:h-full',
        'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:h-full',
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-0.5 p-4 text-center md:text-left',
      className
    )}
    {...props}
  />
));
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
));
DrawerFooter.displayName = "DrawerFooter";

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
