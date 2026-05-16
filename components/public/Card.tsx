import { cn } from "@/helpers/classname-helper";

export default function Card({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col bg-grayscale-2 border border-grayscale-3 rounded-xl p-1.5",
        props.className,
      )}
    >
      {children}
    </div>
  );
}
