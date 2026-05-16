import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CodeIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import ComponentShowcase from "@/components/ComponentShowcase";
import Logo from "@/components/Logo";
import Button from "@/components/public/Button";
import { Switch } from "@/components/public/Switch";
import { Tabs } from "@/components/public/Tabs";
import TextLink from "@/components/public/TextLink";
import Section from "@/components/Section";
import ThemeColorSelector from "@/components/ThemeColorSelector";
import { tokenize } from "@/helpers/syntax";

type PublicComponentFile =
  | "Button.tsx"
  | "TextLink.tsx"
  | "Tabs.tsx"
  | "Switch.tsx";

async function getPublicComponentCode(fileName: PublicComponentFile) {
  const source = await readFile(
    join(process.cwd(), "components", "public", fileName),
    "utf8",
  );
  return tokenize(source);
}

const BUTTON_USAGE = `import Button from "@/components/public/Button";

<Button variant="primary">
  Click me
</Button>

<Button variant="secondary">
  Secondary
</Button>`;

const TEXT_LINK_USAGE = `import TextLink from "@/components/public/TextLink";

<TextLink href="/about">
  Learn more
</TextLink>`;

const TABS_USAGE = `import { Tabs } from "@/components/public/Tabs";

<Tabs.Root defaultValue="one">
  <Tabs.List>
    <Tabs.Tab value="one">Tab One</Tabs.Tab>
    <Tabs.Tab value="two">Tab Two</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="one">Content one</Tabs.Panel>
  <Tabs.Panel value="two">Content two</Tabs.Panel>
</Tabs.Root>`;

const SWITCH_USAGE = `import { Switch } from "@/components/public/Switch";

<Switch.Composed />

<Switch.Composed defaultChecked />`;

export default async function Home() {
  const [
    buttonComponentCode,
    buttonUsageCode,
    textLinkComponentCode,
    textLinkUsageCode,
    tabsComponentCode,
    tabsUsageCode,
    switchComponentCode,
    switchUsageCode,
  ] = await Promise.all([
    getPublicComponentCode("Button.tsx"),
    tokenize(BUTTON_USAGE),
    getPublicComponentCode("TextLink.tsx"),
    tokenize(TEXT_LINK_USAGE),
    getPublicComponentCode("Tabs.tsx"),
    tokenize(TABS_USAGE),
    getPublicComponentCode("Switch.tsx"),
    tokenize(SWITCH_USAGE),
  ]);

  return (
    <div className="flex flex-col w-full divide-y divide-grayscale-3 dark:divide-grayscale-2">
      <div className="relative flex flex-col max-w-4xl mx-auto w-full border-x border-grayscale-3 dark:border-grayscale-2 p-4 md:p-8 lg:p-16">
        <div className="flex flex-col gap-px p-2">
          <Logo />
          <div className="flex flex-row items-center gap-1 mt-3">
            <h1 className="font-bold text-2xl text-grayscale-12 font-mono uppercase">
              Chord
            </h1>
            <p className="text-grayscale-10 text-sm max-w-md text-balance mt-2">
              by
            </p>
            <TextLink
              href="https://dqnamo.com"
              target="_blank"
              className="text-sm mt-2"
            >
              dqnamo
            </TextLink>
          </div>
          <p className="text-grayscale-11 text-sm max-w-md text-balance">
            An opinionated design language and UI Library for building beautiful
            web applications.
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <Button variant="primary" className="text-xs">
              <Link
                href="/#components"
                className="flex flex-row items-center gap-2"
              >
                <CodeIcon size={16} weight="bold" />
                View Components
              </Link>
            </Button>
            <Button variant="secondary" className="text-xs">
              <GithubLogoIcon size={16} weight="bold" />
              Github
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-4xl mx-auto w-full border-x border-grayscale-3 dark:border-grayscale-2 p-4 md:p-8 lg:p-16">
        <div className="flex flex-col p-2">
          <h2 className="font-medium text-grayscale-11">
            First, let&apos;s choose your colors.
          </h2>
          <p className="text-grayscale-10 text-sm max-w-md text-balance">
            Pick a grayscale and an accent color to get started.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-grayscale-9 text-tiny tracking-wide font-mono uppercase font-bold">
              Grayscale Color
            </p>
            <ThemeColorSelector axis="grayscale" />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-grayscale-9 text-tiny tracking-wide font-mono uppercase font-bold">
              Accent Color
            </p>
            <ThemeColorSelector axis="accent" />
          </div>
        </div>
      </div>
      <Section id="components">
        <div className="flex flex-col gap-px p-2">
          <h2 className="font-medium text-grayscale-11">The Components</h2>
          <p className="text-grayscale-10 text-sm max-w-md text-balance">
            Ready to copy code for your project.
          </p>
        </div>
        <div className="flex flex-col gap-8 my-8">
          <ComponentShowcase
            title="The Button"
            previewTabs={[
              {
                value: "primary",
                label: "Primary",
                content: <Button variant="primary">Primary</Button>,
              },
              {
                value: "secondary",
                label: "Secondary",
                content: <Button variant="secondary">Secondary</Button>,
              },
            ]}
            usageCodeLines={buttonUsageCode}
            componentCodeLines={buttonComponentCode}
          />
          <ComponentShowcase
            title="The Text Link"
            previewTabs={[
              {
                value: "default",
                label: "Default",
                content: (
                  <TextLink href="https://www.google.com">Text Link</TextLink>
                ),
              },
            ]}
            usageCodeLines={textLinkUsageCode}
            componentCodeLines={textLinkComponentCode}
          />
          <ComponentShowcase
            title="The Tabs"
            previewTabs={[
              {
                value: "default",
                label: "Default",
                content: (
                  <Tabs.Root
                    defaultValue="overview"
                    className="w-full max-w-xs"
                  >
                    <Tabs.List>
                      <Tabs.Tab value="overview">Overview</Tabs.Tab>
                      <Tabs.Tab value="features">Features</Tabs.Tab>
                      <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
                      <Tabs.Indicator />
                    </Tabs.List>
                    <Tabs.Panel value="overview" className="mt-3">
                      <p className="text-xs text-grayscale-11">
                        A quick look at the product and what it does.
                      </p>
                    </Tabs.Panel>
                    <Tabs.Panel value="features" className="mt-3">
                      <p className="text-xs text-grayscale-11">
                        Key features that set this apart from the rest.
                      </p>
                    </Tabs.Panel>
                    <Tabs.Panel value="reviews" className="mt-3">
                      <p className="text-xs text-grayscale-11">
                        What people are saying about it.
                      </p>
                    </Tabs.Panel>
                  </Tabs.Root>
                ),
              },
            ]}
            usageCodeLines={tabsUsageCode}
            componentCodeLines={tabsComponentCode}
          />
          <ComponentShowcase
            title="The Switch"
            previewTabs={[
              {
                value: "unchecked",
                label: "Unchecked",
                content: <Switch.Composed size={20} />,
              },
              {
                value: "checked",
                label: "Checked",
                content: <Switch.Composed size={20} defaultChecked />,
              },
            ]}
            usageCodeLines={switchUsageCode}
            componentCodeLines={switchComponentCode}
          />
        </div>
      </Section>
    </div>
  );
}
