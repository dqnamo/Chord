import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Root>) => (
  <BaseCollapsible.Root className={cn("w-full", className)} {...props} />
);

const Trigger = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Trigger>) => (
  <BaseCollapsible.Trigger
    className={cn(
      "flex cursor-pointer items-center gap-1 text-sm text-grayscale-12",
      className,
    )}
    {...props}
  />
);

const Panel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseCollapsible.Panel>) => (
  <BaseCollapsible.Panel
    className={cn(
      "h-[var(--collapsible-panel-height)] overflow-hidden text-sm text-grayscale-10 transition-[height] duration-150 ease-out motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0",
      className,
    )}
    {...props}
  />
);

export const Collapsible = { Root, Trigger, Panel };
