import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/helpers/classname-helper";

const Provider = BaseTooltip.Provider;
const Root = BaseTooltip.Root;
const Trigger = BaseTooltip.Trigger;
const Portal = BaseTooltip.Portal;

const Positioner = ({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner>) => (
  <BaseTooltip.Positioner
    sideOffset={sideOffset}
    className={cn("z-50", className)}
    {...props}
  />
);

const Popup = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Popup>) => (
  <BaseTooltip.Popup
    className={cn(
      "rounded-md bg-grayscale-12 px-2 py-1 text-xs text-grayscale-1",
      "origin-[var(--transform-origin)] transition-all duration-150 ease-out",
      "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      className,
    )}
    {...props}
  >
    {children}
  </BaseTooltip.Popup>
);

const Arrow = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Arrow>) => (
  <BaseTooltip.Arrow
    className={cn(
      "h-2 w-2 rotate-45 rounded-[2px] bg-grayscale-12",
      "data-[side=bottom]:-mt-1 data-[side=top]:-mb-1",
      className,
    )}
    {...props}
  />
);

export const Tooltip = {
  Provider,
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Arrow,
};
