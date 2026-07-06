import { Switch } from "@/components/public/Switch";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "switch",
  title: "The Switch",
  category: "Forms & Inputs",
  file: "Switch.tsx",
  usage: `import { Switch } from "@/components/public/Switch";

<Switch.Composed />

<Switch.Composed defaultChecked />`,
  previewTabs: [
    {
      value: "unchecked",
      label: "Unchecked",
      content: <Switch.Composed size={20} />,
    },
    {
      value: "checked",
      label: "Checked",
      content: <Switch.Composed size={20} defaultChecked />,
    },
  ],
};

export default showcase;
