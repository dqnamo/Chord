import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

export default function TextLink({ ...props }: React.ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={cn(
        "group inline-flex items-center gap-0.5 bg-accent-2 text-accent-9 text-xs leading-none transition-colors hover:bg-accent-3 hover:text-accent-10",
        props.className,
      )}
    >
      {props.children}
      <ArrowRightIcon
        aria-hidden="true"
        className="transition-transform duration-150 group-hover:translate-x-0.5"
        size={11}
        weight="bold"
      />
    </a>
  );
}
