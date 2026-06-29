import Button from "@/components/public/Button";
import { Tooltip } from "@/components/public/Tooltip";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "tooltip",
  title: "The Tooltip",
  category: "Overlays",
  file: "Tooltip.tsx",
  usage: `import Button from "@/components/public/Button";
import { Tooltip } from "@/components/public/Tooltip";

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger render={<Button variant="secondary">Hover me</Button>} />
    <Tooltip.Portal>
      <Tooltip.Positioner sideOffset={6}>
        <Tooltip.Popup>
          <Tooltip.Arrow />
          Sync everything instantly
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger
              render={<Button variant="secondary">Hover me</Button>}
            />
            <Tooltip.Portal>
              <Tooltip.Positioner sideOffset={6}>
                <Tooltip.Popup>
                  <Tooltip.Arrow />
                  Sync everything instantly
                </Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ),
    },
  ],
};

export default showcase;
