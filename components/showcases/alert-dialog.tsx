import { AlertDialog } from "@/components/public/AlertDialog";
import Button from "@/components/public/Button";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "alert-dialog",
  title: "The Alert Dialog",
  category: "Overlays",
  file: "AlertDialog.tsx",
  usage: `import { AlertDialog } from "@/components/public/AlertDialog";
import Button from "@/components/public/Button";

<AlertDialog.Root>
  <AlertDialog.Trigger render={<Button variant="secondary">Delete project</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete project?</AlertDialog.Title>
      <AlertDialog.Description>
        This permanently removes the project and all of its data. This action
        cannot be undone.
      </AlertDialog.Description>
      <div className="mt-3 flex justify-end gap-2">
        <AlertDialog.Close render={<Button variant="secondary">Cancel</Button>} />
        <AlertDialog.Close
          render={
            <Button
              variant="primary"
              className="border-red-10 bg-red-9 text-white hover:bg-red-10 dark:border-red-10 dark:bg-red-9 dark:text-white dark:hover:bg-red-10"
            >
              Delete
            </Button>
          }
        />
      </div>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <AlertDialog.Root>
          <AlertDialog.Trigger
            render={<Button variant="secondary">Delete project</Button>}
          />
          <AlertDialog.Portal>
            <AlertDialog.Backdrop />
            <AlertDialog.Popup>
              <AlertDialog.Title>Delete project?</AlertDialog.Title>
              <AlertDialog.Description>
                This permanently removes the project and all of its data. This
                action cannot be undone.
              </AlertDialog.Description>
              <div className="mt-3 flex justify-end gap-2">
                <AlertDialog.Close
                  render={<Button variant="secondary">Cancel</Button>}
                />
                <AlertDialog.Close
                  render={
                    <Button
                      variant="primary"
                      className="border-red-10 bg-red-9 text-white hover:bg-red-10 dark:border-red-10 dark:bg-red-9 dark:text-white dark:hover:bg-red-10"
                    >
                      Delete
                    </Button>
                  }
                />
              </div>
            </AlertDialog.Popup>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      ),
    },
  ],
};

export default showcase;
