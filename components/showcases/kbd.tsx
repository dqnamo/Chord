import Kbd from "@/components/public/Kbd";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "kbd",
  title: "The Kbd",
  category: "Data Display",
  file: "Kbd.tsx",
  usage: `import Kbd from "@/components/public/Kbd";

<span className="flex items-center gap-1 text-sm text-grayscale-11">
  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
</span>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <span className="flex items-center gap-1 text-sm text-grayscale-11">
          <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
        </span>
      ),
    },
  ],
};

export default showcase;
