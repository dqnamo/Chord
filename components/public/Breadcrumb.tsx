import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

const Root = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav aria-label="Breadcrumb" className={className} {...props} />
);

const List = ({ className, ...props }: React.ComponentProps<"ol">) => (
  <ol
    className={cn(
      "flex flex-wrap items-center gap-1.5 text-sm text-grayscale-10",
      className,
    )}
    {...props}
  />
);

const Item = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);

const Link = ({ className, ...props }: React.ComponentProps<"a">) => (
  <a
    className={cn(
      "cursor-pointer text-grayscale-10 transition-colors hover:text-grayscale-12",
      className,
    )}
    {...props}
  />
);

const Page = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-current="page"
    className={cn("font-medium text-grayscale-12", className)}
    {...props}
  />
);

const Separator = ({ className, ...props }: React.ComponentProps<"li">) => (
  <li
    aria-hidden="true"
    className={cn("text-grayscale-8", className)}
    {...props}
  >
    <CaretRight size={12} weight="bold" />
  </li>
);

export const Breadcrumb = {
  Root,
  List,
  Item,
  Link,
  Separator,
  Page,
};
