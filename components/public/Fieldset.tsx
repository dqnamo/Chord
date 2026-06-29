import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { cn } from "@/helpers/classname-helper";

const Root = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Root>) => (
  <BaseFieldset.Root
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
);

const Legend = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseFieldset.Legend>) => (
  <BaseFieldset.Legend
    className={cn("text-sm font-medium text-grayscale-12", className)}
    {...props}
  />
);

export const Fieldset = {
  Root,
  Legend,
};
