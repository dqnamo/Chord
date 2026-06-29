import Skeleton from "@/components/public/Skeleton";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "skeleton",
  title: "The Skeleton",
  category: "Feedback",
  file: "Skeleton.tsx",
  usage: `import Skeleton from "@/components/public/Skeleton";

<div className="flex items-center gap-3">
  <Skeleton className="size-10 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-3 w-40" />
    <Skeleton className="h-3 w-24" />
  </div>
</div>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-full max-w-xs items-center gap-3 rounded-xl border border-grayscale-3 bg-grayscale-1 p-3 dark:border-grayscale-4 dark:bg-grayscale-2">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ),
    },
  ],
};

export default showcase;
