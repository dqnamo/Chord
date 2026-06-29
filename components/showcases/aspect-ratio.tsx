import AspectRatio from "@/components/public/AspectRatio";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "aspect-ratio",
  title: "The AspectRatio",
  category: "Layout",
  file: "AspectRatio.tsx",
  usage: `import AspectRatio from "@/components/public/AspectRatio";

<AspectRatio ratio={16 / 9} className="rounded-lg bg-grayscale-3" />`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="w-64">
          <AspectRatio
            ratio={16 / 9}
            className="grid place-items-center rounded-lg border border-grayscale-3 bg-grayscale-3 text-xs text-grayscale-10 dark:border-grayscale-4 dark:bg-grayscale-4"
          >
            16 / 9
          </AspectRatio>
        </div>
      ),
    },
  ],
};

export default showcase;
