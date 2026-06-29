import Separator from "@/components/public/Separator";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "separator",
  title: "The Separator",
  category: "Layout",
  file: "Separator.tsx",
  usage: `import Separator from "@/components/public/Separator";

<div className="flex flex-col gap-2">
  <p>Above the line</p>
  <Separator />
  <p>Below the line</p>
</div>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-56 flex-col gap-2 text-sm text-grayscale-11">
          <p>Documents</p>
          <Separator />
          <p>Recent activity</p>
        </div>
      ),
    },
  ],
};

export default showcase;
