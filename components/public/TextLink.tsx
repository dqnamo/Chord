import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

export default function TextLink({
  className,
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "group inline-flex items-center gap-0.5 bg-accent-2 text-accent-9 text-xs leading-none transition-colors hover:bg-accent-3 hover:text-accent-10",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
        size={11}
        weight="bold"
      />
    </a>
  );
}
