"use client";

import CodeBlock from "@/components/CodeBlock";
import Button from "@/components/public/Button";
import Card from "@/components/public/Card";
import { Tabs } from "@/components/public/Tabs";
import type { CodeLine } from "@/helpers/syntax";

type PreviewTab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

export type ComponentShowcaseProps = {
  id?: string;
  previewTabs: PreviewTab[];
  usageCodeLines: CodeLine[];
  componentCodeLines: CodeLine[];
};

export default function ComponentShowcase({
  id,
  previewTabs,
  usageCodeLines,
  componentCodeLines,
}: ComponentShowcaseProps) {
  return (
    <div className="flex scroll-mt-8 flex-col" id={id}>
      <Card className="overflow-hidden">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5">
          <Card
            layer={1}
            className="small-shadow flex h-[28rem] min-h-0 flex-col rounded-lg lg:h-[34rem] dark:bg-grayscale-2! dark:border-dashed dark:border-grayscale-3!"
          >
            <Tabs.Base.Root
              className="flex flex-1 flex-col"
              defaultValue={previewTabs[0]?.value}
            >
              <div className="flex flex-row gap-2 p-2 border-b border-grayscale-3 dark:border-grayscale-3 dark:border-dashed justify-between items-center">
                <Tabs.Base.List>
                  {previewTabs.map((tab) => (
                    <Tabs.Base.Tab key={tab.value} value={tab.value}>
                      {tab.label}
                    </Tabs.Base.Tab>
                  ))}
                  <Tabs.Base.Indicator />
                </Tabs.Base.List>
              </div>
              <div className="flex flex-1 flex-row items-center justify-center gap-2 p-8">
                {previewTabs.map((tab) => (
                  <Tabs.Base.Panel
                    key={tab.value}
                    value={tab.value}
                    className="mt-0"
                  >
                    <div className="flex justify-center items-center h-full w-full">
                      {tab.content}
                    </div>
                  </Tabs.Base.Panel>
                ))}
              </div>
            </Tabs.Base.Root>
          </Card>
          <Card
            layer={1}
            className="small-shadow flex h-[28rem] min-h-0 flex-col overflow-hidden rounded-lg border border-grayscale-3 bg-grayscale-1 lg:h-[34rem]"
          >
            <Tabs.Base.Root
              className="flex min-h-0 flex-1 flex-col"
              defaultValue="usage"
            >
              <div className="flex flex-row gap-2 p-2 border-b border-grayscale-3 dark:border-grayscale-4 justify-between items-center">
                <Tabs.Base.List>
                  <Tabs.Base.Tab value="usage">Usage</Tabs.Base.Tab>
                  <Tabs.Base.Tab value="component">Component</Tabs.Base.Tab>
                  <Tabs.Base.Indicator />
                </Tabs.Base.List>
                <Button variant="secondary" className="text-xs">
                  Copy
                </Button>
              </div>
              <Tabs.Base.Panel
                value="usage"
                className="mt-0 flex min-h-0 flex-1 flex-col"
              >
                <CodeBlock lines={usageCodeLines} />
              </Tabs.Base.Panel>
              <Tabs.Base.Panel
                value="component"
                className="mt-0 flex min-h-0 flex-1 flex-col"
              >
                <CodeBlock lines={componentCodeLines} />
              </Tabs.Base.Panel>
            </Tabs.Base.Root>
          </Card>
        </div>
      </Card>
    </div>
  );
}
