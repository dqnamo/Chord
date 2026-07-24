import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Root>) => (
  <BaseAccordion.Root className={cn("w-full", className)} {...props} />
);

const Item = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Item>) => (
  <BaseAccordion.Item
    className={cn(
      "border-b border-grayscale-3 dark:border-grayscale-4",
      className,
    )}
    {...props}
  />
);

const Header = BaseAccordion.Header;

const Trigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Trigger>) => (
  <BaseAccordion.Trigger
    className={cn(
      "group flex w-full cursor-pointer items-center justify-between py-2 text-sm text-grayscale-12",
      className,
    )}
    {...props}
  >
    {children}
    <CaretDown
      weight="bold"
      className="size-3.5 text-grayscale-10 transition-transform group-data-[panel-open]:rotate-180 motion-reduce:transition-none"
    />
  </BaseAccordion.Trigger>
);

const Panel = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseAccordion.Panel>) => (
  <BaseAccordion.Panel
    className={cn(
      "h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-150 ease-out motion-reduce:transition-none data-[ending-style]:h-0 data-[starting-style]:h-0",
      className,
    )}
    {...props}
  >
    <div className="pb-2 text-sm text-grayscale-10">{children}</div>
  </BaseAccordion.Panel>
);

export const Accordion = { Root, Item, Header, Trigger, Panel };
