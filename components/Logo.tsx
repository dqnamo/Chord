import { MusicNotesSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/helpers/classname-helper";

type LogoProps = {
  className?: string;
  iconSize?: number;
};

export default function Logo({ className, iconSize = 20 }: LogoProps) {
  return (
    <div
      className={cn(
        "flex aspect-square w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-grayscale-3 bg-grayscale-1 dark:border-grayscale-4 dark:bg-grayscale-3",
        className,
      )}
    >
      <MusicNotesSimpleIcon
        aria-hidden="true"
        className="text-accent-9"
        size={iconSize}
        weight="fill"
      />
    </div>
  );
}
