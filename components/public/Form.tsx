import { Form as BaseForm } from "@base-ui/react/form";
import { cn } from "@/helpers/classname-helper";

export default function Form({
  className,
  ...props
}: React.ComponentProps<typeof BaseForm>) {
  return (
    <BaseForm className={cn("flex flex-col gap-4", className)} {...props} />
  );
}
