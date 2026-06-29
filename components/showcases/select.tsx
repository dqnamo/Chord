import { Select } from "@/components/public/Select";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "select",
  title: "The Select",
  category: "Forms & Inputs",
  file: "Select.tsx",
  usage: `import { Select } from "@/components/public/Select";

<Select.Root defaultValue="apple">
  <Select.Trigger>
    <Select.Value />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner sideOffset={6}>
      <Select.Popup>
        <Select.List>
          <Select.Item value="apple">
            <Select.ItemText>Apple</Select.ItemText>
          </Select.Item>
          <Select.Item value="banana">
            <Select.ItemText>Banana</Select.ItemText>
          </Select.Item>
        </Select.List>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Select.Root defaultValue="apple">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner sideOffset={6}>
              <Select.Popup>
                <Select.List>
                  <Select.Item value="apple">
                    <Select.ItemText>Apple</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="banana">
                    <Select.ItemText>Banana</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="orange">
                    <Select.ItemText>Orange</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="grape">
                    <Select.ItemText>Grape</Select.ItemText>
                  </Select.Item>
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      ),
    },
  ],
};

export default showcase;
