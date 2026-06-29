import Label from "@/components/public/Label";
import { RadioGroup } from "@/components/public/RadioGroup";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "radio-group",
  title: "The Radio Group",
  category: "Forms & Inputs",
  file: "RadioGroup.tsx",
  usage: `import { RadioGroup } from "@/components/public/RadioGroup";
import Label from "@/components/public/Label";

<RadioGroup.Root defaultValue="standard">
  <Label className="flex items-center gap-2">
    <RadioGroup.Item value="standard" />
    Standard
  </Label>
  <Label className="flex items-center gap-2">
    <RadioGroup.Item value="express" />
    Express
  </Label>
</RadioGroup.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <RadioGroup.Root defaultValue="standard">
          <Label className="flex items-center gap-2">
            <RadioGroup.Item value="standard" />
            Standard
          </Label>
          <Label className="flex items-center gap-2">
            <RadioGroup.Item value="express" />
            Express
          </Label>
          <Label className="flex items-center gap-2">
            <RadioGroup.Item value="overnight" />
            Overnight
          </Label>
        </RadioGroup.Root>
      ),
    },
  ],
};

export default showcase;
