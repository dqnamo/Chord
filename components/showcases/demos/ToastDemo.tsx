"use client";

import { XIcon } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/public/Button";
import { Toast } from "@/components/public/Toast";

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast}>
      <Toast.Title>{toast.title}</Toast.Title>
      {toast.description ? (
        <Toast.Description>{toast.description}</Toast.Description>
      ) : null}
      <Toast.Close aria-label="Close">
        <XIcon size={12} weight="bold" />
      </Toast.Close>
    </Toast.Root>
  ));
}

function ToastTrigger() {
  const manager = Toast.useToastManager();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        manager.add({
          title: "Changes saved",
          description: "Your settings have been updated.",
        })
      }
    >
      Show toast
    </Button>
  );
}

export default function ToastDemo() {
  return (
    <Toast.Provider>
      <ToastTrigger />
      <Toast.Portal>
        <Toast.Viewport>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
