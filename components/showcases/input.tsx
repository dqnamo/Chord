import Input from "@/components/public/Input";
import Label from "@/components/public/Label";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "input",
  title: "The Input",
  category: "Forms & Inputs",
  file: "Input.tsx",
  usage: `import Input from "@/components/public/Input";
import Label from "@/components/public/Label";

<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-56 flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      ),
    },
    {
      value: "disabled",
      label: "Disabled",
      content: (
        <div className="flex w-56 flex-col gap-1.5">
          <Label htmlFor="email-disabled">Email</Label>
          <Input id="email-disabled" disabled placeholder="you@example.com" />
        </div>
      ),
    },
  ],
};

export default showcase;
