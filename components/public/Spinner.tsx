import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

export default function Spinner({
  size = 16,
  className,
  ...props
}: {
  size?: number;
} & Omit<React.ComponentProps<typeof CircleNotchIcon>, "size">) {
  return (
    <CircleNotchIcon
      size={size}
      weight="bold"
      className={cn(
        "animate-spin text-grayscale-9 motion-reduce:animate-pulse",
        className,
      )}
      {...props}
    />
  );
}
