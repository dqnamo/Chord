import Button from "@/components/public/Button";
import { DropdownMenu } from "@/components/public/DropdownMenu";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "dropdown-menu",
  title: "The Dropdown Menu",
  category: "Overlays",
  file: "DropdownMenu.tsx",
  usage: `import { DropdownMenu } from "@/components/public/DropdownMenu";
import Button from "@/components/public/Button";

<DropdownMenu.Root>
  <DropdownMenu.Trigger render={<Button variant="secondary">Options</Button>} />
  <DropdownMenu.Portal>
    <DropdownMenu.Positioner sideOffset={6}>
      <DropdownMenu.Popup>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Popup>
    </DropdownMenu.Positioner>
  </DropdownMenu.Portal>
</DropdownMenu.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            render={<Button variant="secondary">Options</Button>}
          />
          <DropdownMenu.Portal>
            <DropdownMenu.Positioner sideOffset={6}>
              <DropdownMenu.Popup>
                <DropdownMenu.Item>Edit</DropdownMenu.Item>
                <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
                <DropdownMenu.Item>Move to…</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Delete</DropdownMenu.Item>
              </DropdownMenu.Popup>
            </DropdownMenu.Positioner>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ],
};

export default showcase;
