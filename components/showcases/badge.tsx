import Badge from "@/components/public/Badge";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "badge",
  title: "The Badge",
  category: "Data Display",
  file: "Badge.tsx",
  usage: `import Badge from "@/components/public/Badge";

<Badge variant="secondary">Stable</Badge>
<Badge variant="accent">New</Badge>
<Badge variant="solid">Pro</Badge>`,
  previewTabs: [
    {
      value: "default",
      label: "Variants",
      content: (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="solid">Solid</Badge>
        </div>
      ),
    },
  ],
};

export default showcase;
