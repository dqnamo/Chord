import Card from "@/components/public/Card";
import { Tabs } from "@/components/public/Tabs";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "tabs",
  title: "The Tabs",
  category: "Navigation",
  file: "Tabs.tsx",
  usage: `import Card from "@/components/public/Card";
import { Tabs } from "@/components/public/Tabs";

<Card layer={1} className="w-80 max-w-full gap-0 overflow-hidden">
  <Tabs.Root defaultValue="one">
    <div className="border-b border-grayscale-3 p-2">
      <Tabs.List>
        <Tabs.Tab value="one">Tab One</Tabs.Tab>
        <Tabs.Tab value="two">Tab Two</Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
    </div>
    <div className="p-3">
      <Tabs.Panel value="one">Content one</Tabs.Panel>
      <Tabs.Panel value="two">Content two</Tabs.Panel>
    </div>
  </Tabs.Root>
</Card>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Card
          layer={1}
          className="w-80 max-w-full cursor-default gap-0 overflow-hidden"
        >
          <Tabs.Root defaultValue="overview">
            <div className="border-b border-grayscale-3 p-2 dark:border-grayscale-5">
              <Tabs.List>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="features">Features</Tabs.Tab>
                <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
                <Tabs.Indicator />
              </Tabs.List>
            </div>
            <div className="min-h-20 p-3">
              <Tabs.Panel value="overview">
                <p className="text-xs text-grayscale-11">
                  A quick look at the product and what it does.
                </p>
              </Tabs.Panel>
              <Tabs.Panel value="features">
                <p className="text-xs text-grayscale-11">
                  Key features that set this apart from the rest.
                </p>
              </Tabs.Panel>
              <Tabs.Panel value="reviews">
                <p className="text-xs text-grayscale-11">
                  What people are saying about it.
                </p>
              </Tabs.Panel>
            </div>
          </Tabs.Root>
        </Card>
      ),
    },
  ],
};

export default showcase;
