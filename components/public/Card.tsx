import { cn } from "@/helpers/classname-helper";

type CardProps = {
  layer?: number;
  hoverable?: boolean;
} & React.ComponentProps<"div">;

const layerClasses = [
  {
    base: "w-full rounded-xl border border-grayscale-3 bg-grayscale-2 p-1.5",
    hover: "",
  },
  {
    base: "small-shadow flex min-w-0 cursor-pointer flex-col gap-1 rounded-lg border border-grayscale-3 bg-grayscale-1 transition-colors dark:border-grayscale-5 dark:bg-grayscale-3",
    hover:
      "hover:border-grayscale-4 hover:bg-grayscale-2 dark:hover:border-grayscale-6 dark:hover:bg-grayscale-4",
  },
];

export default function Card({
  layer = 0,
  hoverable = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        layerClasses[layer].base,
        hoverable && layerClasses[layer].hover,
        className,
      )}
      {...props}
    />
  );
}
