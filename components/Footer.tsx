import { cn } from "@/helpers/classname-helper";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex h-10 w-full shrink-0 items-center justify-end border-grayscale-3 border-t px-3",
        className,
      )}
    >
      <a
        className="text-grayscale-10 font-pirata text-lg transition-colors hover:text-grayscale-12"
        href="https://dqnamo.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        dqnamo
      </a>
    </footer>
  );
}
