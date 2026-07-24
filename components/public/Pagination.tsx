import {
  CaretLeft,
  CaretRight,
  DotsThree,
} from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";
import { cn } from "@/helpers/classname-helper";

const Root = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="Pagination" className={className} {...props} />
);

const List = ({ className, ...props }: React.ComponentProps<"ul">) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
);

const pageButtonVariants = cva(
  [
    "flex h-8 min-w-8 cursor-pointer items-center justify-center gap-1 rounded-lg border px-2 text-sm font-medium outline-none",
    "transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100",
    "focus-visible:ring-2 focus-visible:ring-accent-4",
  ],
  {
    variants: {
      active: {
        true: "border-accent-9 bg-accent-9 text-white hover:bg-accent-10 dark:text-white",
        false:
          "border-grayscale-3 bg-white text-grayscale-11 hover:border-grayscale-4 hover:bg-grayscale-2 dark:border-grayscale-4 dark:bg-grayscale-3 dark:hover:border-grayscale-5 dark:hover:bg-grayscale-4",
      },
      navigation: {
        true: "disabled:pointer-events-none disabled:opacity-50",
        false: null,
      },
    },
    defaultVariants: {
      active: false,
      navigation: false,
    },
  },
);

type PageProps = React.ComponentProps<"button"> & { isActive?: boolean };

const Item = ({ className, isActive, ...props }: PageProps) => (
  <li>
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(pageButtonVariants({ active: isActive }), className)}
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
      className={cn(pageButtonVariants({ navigation: true }), className)}
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
      className={cn(pageButtonVariants({ navigation: true }), className)}
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
