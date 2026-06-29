import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "@/helpers/classname-helper";

export default function Separator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      className={cn(
        "bg-grayscale-3 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px dark:bg-grayscale-4",
        className,
      )}
      {...props}
    />
  );
}
