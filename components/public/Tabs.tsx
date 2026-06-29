import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/helpers/classname-helper";

type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = React.ComponentProps<typeof BaseTabs.Root> & {
  items: TabItem[];
  listClassName?: string;
  panelClassName?: string;
};

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root>) => (
  <BaseTabs.Root className={cn("relative", className)} {...props} />
);

const List = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) => (
  <BaseTabs.List
    className={cn("flex flex-row gap-0.5 relative", className)}
    {...props}
  />
);

const Tab = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) => (
  <BaseTabs.Tab
    className={cn(
      "relative cursor-pointer z-10 px-2 py-1 text-xs text-grayscale-10 data-active:text-grayscale-11",
      className,
    )}
    {...props}
  />
);

const Indicator = ({
  className,
  style,
  ...props
}: React.ComponentProps<typeof BaseTabs.Indicator>) => (
  <BaseTabs.Indicator
    className={cn(
      "absolute rounded-md bg-grayscale-3 transition-all duration-200 ease-out",
      className,
    )}
    style={{
      left: "var(--active-tab-left)",
      top: "var(--active-tab-top)",
      width: "var(--active-tab-width)",
      height: "var(--active-tab-height)",
      ...style,
    }}
    {...props}
  />
);

const Panel = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) => (
  <BaseTabs.Panel className={cn(className)} {...props} />
);

function TabsComponent({
  items,
  listClassName,
  panelClassName,
  defaultValue,
  ...props
}: TabsProps) {
  return (
    <Root
      defaultValue={defaultValue === undefined ? items[0]?.value : defaultValue}
      {...props}
    >
      <List className={listClassName}>
        {items.map((item) => (
          <Tab key={item.value} value={item.value}>
            {item.label}
          </Tab>
        ))}
        <Indicator />
      </List>
      {items.map((item) => (
        <Panel className={panelClassName} key={item.value} value={item.value}>
          {item.content}
        </Panel>
      ))}
    </Root>
  );
}

export const Tabs = Object.assign(TabsComponent, {
  Root,
  List,
  Tab,
  Indicator,
  Panel,
  Base: {
    Root,
    List,
    Tab,
    Indicator,
    Panel,
  },
});
