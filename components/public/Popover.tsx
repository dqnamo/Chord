import { Popover as BasePopover } from "@base-ui/react/popover";
import { cn } from "@/helpers/classname-helper";

const Root = BasePopover.Root;
const Trigger = BasePopover.Trigger;
const Close = BasePopover.Close;
const Portal = BasePopover.Portal;

const Backdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Backdrop>) => (
  <BasePopover.Backdrop
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
}: React.ComponentProps<typeof BasePopover.Positioner>) => (
  <BasePopover.Positioner
    sideOffset={sideOffset}
    className={cn("z-50", className)}
    {...props}
  />
);

const Popup = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BasePopover.Popup>) => (
  <BasePopover.Popup
    className={cn(
      "medium-shadow w-64 rounded-xl border border-grayscale-3 bg-grayscale-1 p-3",
      "flex flex-col gap-1 origin-[var(--transform-origin)]",
      "transition-[transform,opacity] duration-150 ease-out motion-reduce:transition-none",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  >
    {children}
  </BasePopover.Popup>
);

const Arrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Arrow>) => (
  <BasePopover.Arrow
    className={cn(
      "h-2.5 w-2.5 rotate-45 rounded-[2px] border border-grayscale-3 bg-grayscale-1",
      "data-[side=bottom]:-mt-1.5 data-[side=top]:-mb-1.5",
      "dark:border-grayscale-4 dark:bg-grayscale-2",
      className,
    )}
    {...props}
  />
);

const Title = ({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Title>) => (
  <BasePopover.Title
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Description = ({
  className,
  ...props
}: React.ComponentProps<typeof BasePopover.Description>) => (
  <BasePopover.Description
    className={cn("text-xs text-grayscale-10 text-balance", className)}
    {...props}
  />
);

export const Popover = {
  Root,
  Trigger,
  Close,
  Portal,
  Backdrop,
  Positioner,
  Popup,
  Arrow,
  Title,
  Description,
};
