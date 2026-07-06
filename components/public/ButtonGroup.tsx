import { cn } from "@/helpers/classname-helper";

export default function ButtonGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "inline-flex items-center",
        "[&>*]:rounded-none!",
        "[&>*:first-child]:rounded-l-lg!",
        "[&>*:last-child]:rounded-r-lg!",
        "[&>*:not(:first-child)]:-ml-px",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
