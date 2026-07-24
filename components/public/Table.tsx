import { cn } from "@/helpers/classname-helper";

const Root = ({ className, ...props }: React.ComponentProps<"table">) => (
  <table className={cn("w-full text-sm", className)} {...props} />
);

const Header = ({ className, ...props }: React.ComponentProps<"thead">) => (
  <thead className={className} {...props} />
);

const Body = ({ className, ...props }: React.ComponentProps<"tbody">) => (
  <tbody className={className} {...props} />
);

const Row = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr
    className={cn(
      "border-b border-grayscale-3 dark:border-grayscale-4",
      className,
    )}
    {...props}
  />
);

const Head = ({ className, ...props }: React.ComponentProps<"th">) => (
  <th
    className={cn(
      "px-2 py-1.5 text-left text-xs font-medium text-grayscale-10",
      className,
    )}
    {...props}
  />
);

const Cell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td className={cn("px-2 py-1.5 text-grayscale-11", className)} {...props} />
);

export const Table = { Root, Header, Body, Row, Head, Cell };
