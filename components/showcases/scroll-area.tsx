import { ScrollArea } from "@/components/public/ScrollArea";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "scroll-area",
  title: "The ScrollArea",
  category: "Layout",
  file: "ScrollArea.tsx",
  usage: `import { ScrollArea } from "@/components/public/ScrollArea";

<ScrollArea.Root className="h-32 w-64">
  <ScrollArea.Viewport>
    <ScrollArea.Content>{/* tall content */}</ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar>
    <ScrollArea.Thumb />
  </ScrollArea.Scrollbar>
</ScrollArea.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <ScrollArea.Root className="h-32 w-64 rounded-lg border border-grayscale-3 dark:border-grayscale-4">
          <ScrollArea.Viewport className="p-3">
            <ScrollArea.Content className="text-sm text-grayscale-11">
              <p className="font-medium text-grayscale-12">Release notes</p>
              {Array.from({ length: 10 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static demo list
                <p key={i} className="mt-2">
                  Line {i + 1}: Chord ships quiet, dense, bordered primitives
                  you can paste into any project.
                </p>
              ))}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner />
        </ScrollArea.Root>
      ),
    },
  ],
};

export default showcase;
