import { InfoIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { Alert } from "@/components/public/Alert";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "alert",
  title: "The Alert",
  category: "Feedback",
  file: "Alert.tsx",
  usage: `import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { Alert } from "@/components/public/Alert";

<Alert.Root variant="accent">
  <InfoIcon className="mt-0.5 size-4 shrink-0 text-accent-9" weight="bold" />
  <Alert.Content>
    <Alert.Title>Heads up</Alert.Title>
    <Alert.Description>A new version is available to install.</Alert.Description>
  </Alert.Content>
</Alert.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Alert.Root variant="accent">
            <InfoIcon
              className="mt-0.5 size-4 shrink-0 text-accent-9"
              weight="bold"
            />
            <Alert.Content>
              <Alert.Title>Heads up</Alert.Title>
              <Alert.Description>
                A new version of Chord is available to install.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
          <Alert.Root variant="default">
            <WarningIcon
              className="mt-0.5 size-4 shrink-0 text-grayscale-9"
              weight="bold"
            />
            <Alert.Content>
              <Alert.Title>Storage almost full</Alert.Title>
              <Alert.Description>
                You have used 92% of your available space.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </div>
      ),
    },
  ],
};

export default showcase;
