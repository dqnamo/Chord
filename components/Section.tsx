import { cn } from "@/helpers/classname-helper";

export default function Section({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="mx-auto flex w-full max-w-4xl flex-col border-x border-grayscale-3 p-4 md:p-8 lg:p-16 dark:border-grayscale-2">
        {children}
      </div>
    </div>
  );
}
