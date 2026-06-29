import Button from "@/components/public/Button";
import { Popover } from "@/components/public/Popover";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "popover",
  title: "The Popover",
  category: "Overlays",
  file: "Popover.tsx",
  usage: `import Button from "@/components/public/Button";
import { Popover } from "@/components/public/Popover";

<Popover.Root>
  <Popover.Trigger render={<Button variant="secondary">Details</Button>} />
  <Popover.Portal>
    <Popover.Positioner sideOffset={6}>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Connected workspace</Popover.Title>
        <Popover.Description>
          Changes sync to everyone in this project in real time.
        </Popover.Description>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Popover.Root>
          <Popover.Trigger
            render={<Button variant="secondary">Details</Button>}
          />
          <Popover.Portal>
            <Popover.Positioner sideOffset={6}>
              <Popover.Popup>
                <Popover.Arrow />
                <Popover.Title>Connected workspace</Popover.Title>
                <Popover.Description>
                  Changes sync to everyone in this project in real time.
                </Popover.Description>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover.Root>
      ),
    },
  ],
};

export default showcase;
