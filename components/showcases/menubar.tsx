import { Menubar } from "@/components/public/Menubar";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "menubar",
  title: "The Menubar",
  category: "Navigation",
  file: "Menubar.tsx",
  usage: `import { Menubar } from "@/components/public/Menubar";

<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Portal>
      <Menubar.Positioner sideOffset={6}>
        <Menubar.Popup>
          <Menubar.Item>New File</Menubar.Item>
          <Menubar.Item>Open…</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Save</Menubar.Item>
        </Menubar.Popup>
      </Menubar.Positioner>
    </Menubar.Portal>
  </Menubar.Menu>
</Menubar.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Menubar.Root>
          <Menubar.Menu>
            <Menubar.Trigger>File</Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Positioner sideOffset={6}>
                <Menubar.Popup>
                  <Menubar.Item>New File</Menubar.Item>
                  <Menubar.Item>Open…</Menubar.Item>
                  <Menubar.Separator />
                  <Menubar.Item>Save</Menubar.Item>
                </Menubar.Popup>
              </Menubar.Positioner>
            </Menubar.Portal>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>Edit</Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Positioner sideOffset={6}>
                <Menubar.Popup>
                  <Menubar.Item>Undo</Menubar.Item>
                  <Menubar.Item>Redo</Menubar.Item>
                  <Menubar.Separator />
                  <Menubar.Item>Cut</Menubar.Item>
                  <Menubar.Item>Copy</Menubar.Item>
                  <Menubar.Item>Paste</Menubar.Item>
                </Menubar.Popup>
              </Menubar.Positioner>
            </Menubar.Portal>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger>View</Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Positioner sideOffset={6}>
                <Menubar.Popup>
                  <Menubar.Item>Zoom In</Menubar.Item>
                  <Menubar.Item>Zoom Out</Menubar.Item>
                  <Menubar.Separator />
                  <Menubar.Item>Full Screen</Menubar.Item>
                </Menubar.Popup>
              </Menubar.Positioner>
            </Menubar.Portal>
          </Menubar.Menu>
        </Menubar.Root>
      ),
    },
  ],
};

export default showcase;
