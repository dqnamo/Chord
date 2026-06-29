import Button from "@/components/public/Button";
import { Drawer } from "@/components/public/Drawer";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "drawer",
  title: "The Drawer",
  category: "Overlays",
  file: "Drawer.tsx",
  usage: `import Button from "@/components/public/Button";
import { Drawer } from "@/components/public/Drawer";

<Drawer.Root swipeDirection="right">
  <Drawer.Trigger render={<Button variant="secondary">Open drawer</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup>
      <Drawer.Title>Project settings</Drawer.Title>
      <Drawer.Description>
        Tune how this workspace behaves. Changes save automatically.
      </Drawer.Description>
      <div className="mt-4 flex justify-end">
        <Drawer.Close render={<Button variant="secondary">Done</Button>} />
      </div>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Drawer.Root swipeDirection="right">
          <Drawer.Trigger
            render={<Button variant="secondary">Open drawer</Button>}
          />
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup>
              <Drawer.Title>Project settings</Drawer.Title>
              <Drawer.Description>
                Tune how this workspace behaves. Changes save automatically.
              </Drawer.Description>
              <div className="mt-4 flex justify-end">
                <Drawer.Close
                  render={<Button variant="secondary">Done</Button>}
                />
              </div>
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
      ),
    },
  ],
};

export default showcase;
