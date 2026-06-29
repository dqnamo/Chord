import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { NavigationMenu } from "@/components/public/NavigationMenu";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "navigation-menu",
  title: "The Navigation Menu",
  category: "Navigation",
  file: "NavigationMenu.tsx",
  usage: `import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { NavigationMenu } from "@/components/public/NavigationMenu";

<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        Products
        <NavigationMenu.Icon>
          <CaretDown size={12} weight="bold" />
        </NavigationMenu.Icon>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
        <NavigationMenu.Link href="#">Automation</NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
  <NavigationMenu.Portal>
    <NavigationMenu.Positioner sideOffset={6}>
      <NavigationMenu.Popup>
        <NavigationMenu.Viewport />
      </NavigationMenu.Popup>
    </NavigationMenu.Positioner>
  </NavigationMenu.Portal>
</NavigationMenu.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <NavigationMenu.Root>
          <NavigationMenu.List>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger>
                Products
                <NavigationMenu.Icon>
                  <CaretDown size={12} weight="bold" />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
                <NavigationMenu.Link href="#">Automation</NavigationMenu.Link>
                <NavigationMenu.Link href="#">Integrations</NavigationMenu.Link>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                href="#"
                className="px-2 py-1 text-sm hover:bg-grayscale-3"
              >
                Pricing
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner sideOffset={6}>
              <NavigationMenu.Popup>
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>
      ),
    },
  ],
};

export default showcase;
