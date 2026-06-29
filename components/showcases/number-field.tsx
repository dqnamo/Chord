import Label from "@/components/public/Label";
import { NumberField } from "@/components/public/NumberField";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "number-field",
  title: "The Number Field",
  category: "Forms & Inputs",
  file: "NumberField.tsx",
  usage: `import { NumberField } from "@/components/public/NumberField";

<NumberField.Root defaultValue={1} min={0}>
  <NumberField.Group>
    <NumberField.Decrement />
    <NumberField.Input />
    <NumberField.Increment />
  </NumberField.Group>
</NumberField.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <NumberField.Root id="quantity" defaultValue={1} min={0}>
            <NumberField.Group>
              <NumberField.Decrement />
              <NumberField.Input />
              <NumberField.Increment />
            </NumberField.Group>
          </NumberField.Root>
        </div>
      ),
    },
  ],
};

export default showcase;
