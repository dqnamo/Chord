import { ContextMenu } from "@/components/public/ContextMenu";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "context-menu",
  title: "The Context Menu",
  category: "Overlays",
  file: "ContextMenu.tsx",
  usage: `import { ContextMenu } from "@/components/public/ContextMenu";

<ContextMenu.Root>
  <ContextMenu.Trigger className="...">
    Right-click here
  </ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup>
        <ContextMenu.Item>Back</ContextMenu.Item>
        <ContextMenu.Item>Reload</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Inspect</ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <ContextMenu.Root>
          <ContextMenu.Trigger className="flex h-28 w-64 select-none items-center justify-center rounded-lg border border-dashed border-grayscale-5 bg-grayscale-1 text-sm text-grayscale-10 dark:border-grayscale-5 dark:bg-grayscale-2">
            Right-click here
          </ContextMenu.Trigger>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup>
                <ContextMenu.Item>Back</ContextMenu.Item>
                <ContextMenu.Item>Reload</ContextMenu.Item>
                <ContextMenu.Item>Save as…</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>Inspect</ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu.Root>
      ),
    },
  ],
};

export default showcase;
