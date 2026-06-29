import { cn } from "@/helpers/classname-helper";

export default function AspectRatio({
  ratio = 16 / 9,
  className,
  style,
  ...props
}: { ratio?: number } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full overflow-hidden", className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  );
}
