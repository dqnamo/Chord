import ToastDemo from "@/components/showcases/demos/ToastDemo";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "toast",
  title: "The Toast",
  category: "Feedback",
  file: "Toast.tsx",
  usage: `import Button from "@/components/public/Button";
import { Toast } from "@/components/public/Toast";

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Title>{toast.title}</Toast.Title>
      <Toast.Description>{toast.description}</Toast.Description>
      <Toast.Close>×</Toast.Close>
    </Toast.Root>
  ));
}

function Trigger() {
  const manager = Toast.useToastManager();
  return (
    <Button
      onClick={() =>
        manager.add({ title: "Changes saved", description: "Updated." })
      }
    >
      Show toast
    </Button>
  );
}

<Toast.Provider>
  <Trigger />
  <Toast.Portal>
    <Toast.Viewport>
      <ToastList />
    </Toast.Viewport>
  </Toast.Portal>
</Toast.Provider>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: <ToastDemo />,
    },
  ],
};

export default showcase;
