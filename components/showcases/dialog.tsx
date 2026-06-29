import Button from "@/components/public/Button";
import { Dialog } from "@/components/public/Dialog";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "dialog",
  title: "The Dialog",
  category: "Overlays",
  file: "Dialog.tsx",
  usage: `import Button from "@/components/public/Button";
import { Dialog } from "@/components/public/Dialog";

<Dialog.Root>
  <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Update available</Dialog.Title>
      <Dialog.Description>
        A new version of Chord is ready to install.
      </Dialog.Description>
      <div className="mt-3 flex justify-end gap-2">
        <Dialog.Close render={<Button variant="secondary">Later</Button>} />
        <Dialog.Close render={<Button variant="primary">Install</Button>} />
      </div>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Dialog.Root>
          <Dialog.Trigger
            render={<Button variant="secondary">Open dialog</Button>}
          />
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Popup>
              <Dialog.Title>Update available</Dialog.Title>
              <Dialog.Description>
                A new version of Chord is ready to install.
              </Dialog.Description>
              <div className="mt-3 flex justify-end gap-2">
                <Dialog.Close
                  render={<Button variant="secondary">Later</Button>}
                />
                <Dialog.Close
                  render={<Button variant="primary">Install</Button>}
                />
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      ),
    },
  ],
};

export default showcase;
