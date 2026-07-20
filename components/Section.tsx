import { cn } from "@/helpers/classname-helper";

export default function Section({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="mx-auto flex w-full max-w-4xl flex-col p-4 md:p-8 lg:p-12">
        {children}
      </div>
    </div>
  );
}
