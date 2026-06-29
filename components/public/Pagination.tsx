import {
  CaretLeft,
  CaretRight,
  DotsThree,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="Pagination" className={cn(className)} {...props} />
);

const List = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
);

const baseButton =
  "flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg border border-b-2 px-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-4";

const inactiveButton =
  "border-grayscale-3 bg-white text-grayscale-11 hover:bg-grayscale-2 hover:border-grayscale-4 dark:border-grayscale-4 dark:bg-grayscale-3 dark:hover:bg-grayscale-4 dark:hover:border-grayscale-5";

const activeButton =
  "border-accent-9 bg-accent-9 text-white hover:bg-accent-10 dark:text-white";

type PageProps = React.ComponentProps<"button"> & { isActive?: boolean };

const Item = ({ className, isActive, ...props }: PageProps) => (
  <li>
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        baseButton,
        isActive ? activeButton : inactiveButton,
        className,
      )}
      {...props}
    />
  </li>
);

const Previous = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => (
  <li>
    <button
      type="button"
      aria-label="Previous page"
      className={cn(
        baseButton,
        inactiveButton,
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CaretLeft size={14} weight="bold" />
      {children}
    </button>
  </li>
);

const Next = ({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) => (
  <li>
    <button
      type="button"
      aria-label="Next page"
      className={cn(
        baseButton,
        inactiveButton,
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <CaretRight size={14} weight="bold" />
    </button>
  </li>
);

const Ellipsis = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li
    aria-hidden="true"
    className={cn(
      "flex h-8 min-w-8 items-center justify-center text-grayscale-9",
      className,
    )}
    {...props}
  >
    <DotsThree size={16} weight="bold" />
  </li>
);

export const Pagination = {
  Root,
  List,
  Item,
  Previous,
  Next,
  Ellipsis,
};
