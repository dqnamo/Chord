import Checkbox from "@/components/public/Checkbox";
import CheckboxGroup from "@/components/public/CheckboxGroup";
import Label from "@/components/public/Label";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "checkbox-group",
  title: "The CheckboxGroup",
  category: "Forms & Inputs",
  file: "CheckboxGroup.tsx",
  usage: `import Checkbox from "@/components/public/Checkbox";
import CheckboxGroup from "@/components/public/CheckboxGroup";
import Label from "@/components/public/Label";

<CheckboxGroup defaultValue={["email"]}>
  <Label className="flex items-center gap-2">
    <Checkbox name="email" /> Email
  </Label>
  <Label className="flex items-center gap-2">
    <Checkbox name="sms" /> SMS
  </Label>
  <Label className="flex items-center gap-2">
    <Checkbox name="push" /> Push
  </Label>
</CheckboxGroup>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <CheckboxGroup defaultValue={["email"]}>
          <Label className="flex items-center gap-2">
            <Checkbox name="email" /> Email
          </Label>
          <Label className="flex items-center gap-2">
            <Checkbox name="sms" /> SMS
          </Label>
          <Label className="flex items-center gap-2">
            <Checkbox name="push" /> Push
          </Label>
        </CheckboxGroup>
      ),
    },
  ],
};

export default showcase;
