"use client";

import { CheckCircleIcon } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { CopyIcon } from "@phosphor-icons/react/dist/csr/Copy";
import { useEffect, useRef, useState } from "react";

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

type StandaloneExample = {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  codeLines: CodeLine[];
};

export type ComponentShowcaseProps = {
  id?: string;
  previewTabs: PreviewTab[];
  usageCodeLines: CodeLine[];
  componentCodeLines: CodeLine[];
  examples?: StandaloneExample[];
};

function codeLinesToText(lines: CodeLine[]) {
  return lines
    .map((line) => line.tokens.map((token) => token.content).join(""))
    .join("\n");
}

function CopyCodeButton({ lines }: { lines: CodeLine[] }) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeLinesToText(lines));
    } catch {
      return;
    }

    setCopied(true);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
      resetTimeoutRef.current = null;
    }, 1600);
  }

  return (
    <Button
      className="text-xs"
      onClick={handleCopy}
      type="button"
      variant="secondary"
    >
      <Button.Content state={copied ? "copied" : "idle"}>
        {copied ? (
          <>
            <CheckCircleIcon
              aria-hidden="true"
              className="text-green-9"
              size={16}
              weight="fill"
            />
            Copied
          </>
        ) : (
          <>
            <CopyIcon aria-hidden="true" size={16} weight="bold" />
            Copy
          </>
        )}
      </Button.Content>
    </Button>
  );
}

export default function ComponentShowcase({
  id,
  previewTabs,
  usageCodeLines,
  componentCodeLines,
  examples = [],
}: ComponentShowcaseProps) {
  const [codeTab, setCodeTab] = useState("usage");
  const activeCodeLines =
    codeTab === "component" ? componentCodeLines : usageCodeLines;

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
              onValueChange={setCodeTab}
              value={codeTab}
            >
              <div className="flex flex-row gap-2 p-2 border-b border-grayscale-3 dark:border-grayscale-4 justify-between items-center">
                <Tabs.Base.List>
                  <Tabs.Base.Tab value="usage">Usage</Tabs.Base.Tab>
                  <Tabs.Base.Tab value="component">Component</Tabs.Base.Tab>
                  <Tabs.Base.Indicator />
                </Tabs.Base.List>
                <CopyCodeButton key={codeTab} lines={activeCodeLines} />
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

      {examples.map((example) => (
        <section
          className="mt-8 flex scroll-mt-8 flex-col"
          id={example.id}
          key={example.id}
        >
          <div className="flex flex-col gap-1 p-2">
            <h2 className="font-medium text-grayscale-11">{example.title}</h2>
            <p className="max-w-md text-pretty text-grayscale-10 text-sm">
              {example.description}
            </p>
          </div>

          <Card className="mt-2 overflow-hidden">
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-1.5">
              <Card
                layer={1}
                className="small-shadow flex h-[28rem] min-h-0 flex-col rounded-lg lg:h-[34rem] dark:bg-grayscale-2! dark:border-dashed dark:border-grayscale-3!"
              >
                <div className="flex items-center border-grayscale-3 border-b p-2 dark:border-grayscale-3 dark:border-dashed">
                  <p className="font-medium text-grayscale-10 text-xs">
                    Preview
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center p-8">
                  {example.content}
                </div>
              </Card>

              <Card
                layer={1}
                className="small-shadow flex h-[28rem] min-h-0 flex-col overflow-hidden rounded-lg border border-grayscale-3 bg-grayscale-1 lg:h-[34rem]"
              >
                <div className="flex items-center justify-between gap-2 border-grayscale-3 border-b p-2 dark:border-grayscale-4">
                  <p className="font-medium text-grayscale-10 text-xs">Code</p>
                  <CopyCodeButton lines={example.codeLines} />
                </div>
                <CodeBlock lines={example.codeLines} />
              </Card>
            </div>
          </Card>
        </section>
      ))}
    </div>
  );
}
