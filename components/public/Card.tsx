import { cn } from "@/helpers/classname-helper";

export default function Card({
  layer = 0,
  hoverable = false,
  children,
  ...props
}: {
  layer?: number;
  hoverable?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  const layerClasses = [
    {
      base: "w-full rounded-xl border border-grayscale-3 bg-grayscale-2 p-1.5",
      hover: "",
    },
    {
      base: "small-shadow min-w-0 rounded-lg border border-grayscale-3 bg-grayscale-1 dark:bg-grayscale-3 dark:border-grayscale-5 cursor-pointer transition-colors flex flex-col gap-1",
      hover:
        "hover:bg-grayscale-2 hover:border-grayscale-4 dark:hover:bg-grayscale-4 dark:hover:border-grayscale-6",
    },
  ];

  const classes = cn(
    layerClasses[layer].base,
    props.className,
    hoverable && layerClasses[layer].hover,
  );
  return <div className={classes}>{children}</div>;
}
