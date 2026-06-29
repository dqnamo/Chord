import Checkbox from "@/components/public/Checkbox";
import Label from "@/components/public/Label";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "checkbox",
  title: "The Checkbox",
  category: "Forms & Inputs",
  file: "Checkbox.tsx",
  usage: `import Checkbox from "@/components/public/Checkbox";
import Label from "@/components/public/Label";

<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="c1" defaultChecked />
            <Label htmlFor="c1">Checked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="c2" />
            <Label htmlFor="c2">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="c3" indeterminate />
            <Label htmlFor="c3">Indeterminate</Label>
          </div>
        </div>
      ),
    },
  ],
};

export default showcase;
