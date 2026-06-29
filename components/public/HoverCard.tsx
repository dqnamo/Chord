import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { cn } from "@/helpers/classname-helper";

const Root = BasePreviewCard.Root;
const Trigger = BasePreviewCard.Trigger;
const Portal = BasePreviewCard.Portal;

const Backdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Backdrop>) => (
  <BasePreviewCard.Backdrop
    className={cn(
      "fixed inset-0 z-40 transition-opacity duration-150",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      className,
    )}
    {...props}
  />
);

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Positioner>) => (
  <BasePreviewCard.Positioner
    sideOffset={sideOffset}
    className={cn("z-50", className)}
    {...props}
  />
);

const Popup = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Popup>) => (
  <BasePreviewCard.Popup
    className={cn(
      "medium-shadow w-64 rounded-xl border border-grayscale-3 bg-grayscale-1 p-4",
      "origin-[var(--transform-origin)] transition-all duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  >
    {children}
  </BasePreviewCard.Popup>
);

const Arrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BasePreviewCard.Arrow>) => (
  <BasePreviewCard.Arrow
    className={cn(
      "h-2.5 w-2.5 rotate-45 rounded-[2px] border border-grayscale-3 bg-grayscale-1",
      "data-[side=bottom]:-mt-1.5 data-[side=top]:-mb-1.5",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

export const HoverCard = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Positioner,
  Popup,
  Arrow,
};
