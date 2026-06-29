import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Root>) => (
  <BaseScrollArea.Root className={cn("relative", className)} {...props} />
);

const Viewport = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Viewport>) => (
  <BaseScrollArea.Viewport
    className={cn(
      "size-full overscroll-contain rounded-[inherit] focus-visible:outline-2 focus-visible:outline-accent-8",
      className,
    )}
    {...props}
  />
);

const Content = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Content>) => (
  <BaseScrollArea.Content className={cn(className)} {...props} />
);

const Scrollbar = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Scrollbar>) => (
  <BaseScrollArea.Scrollbar
    className={cn(
      "flex w-1.5 touch-none select-none p-px data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
      className,
    )}
    {...props}
  />
);

const Thumb = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Thumb>) => (
  <BaseScrollArea.Thumb
    className={cn("rounded-full bg-grayscale-6", className)}
    {...props}
  />
);

const Corner = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseScrollArea.Corner>) => (
  <BaseScrollArea.Corner className={cn(className)} {...props} />
);

export const ScrollArea = {
  Root,
  Viewport,
  Content,
  Scrollbar,
  Thumb,
  Corner,
};
