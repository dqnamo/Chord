import type { ShowcaseCategory } from "@/helpers/showcase";

// Lightweight, JSX-free index of all component showcases for navigation.
// Generated from components/showcases/*.tsx — keep in sync when adding components.
export type ComponentIndexEntry = {
  id: string;
  title: string;
  category: ShowcaseCategory;
};

export const COMPONENT_INDEX: ComponentIndexEntry[] = [
  { id: "accordion", title: "The Accordion", category: "Data Display" },
  { id: "alert", title: "The Alert", category: "Feedback" },
  { id: "alert-dialog", title: "The Alert Dialog", category: "Overlays" },
  { id: "aspect-ratio", title: "The AspectRatio", category: "Layout" },
  { id: "avatar", title: "The Avatar", category: "Data Display" },
  { id: "badge", title: "The Badge", category: "Data Display" },
  { id: "breadcrumb", title: "The Breadcrumb", category: "Navigation" },
  { id: "button", title: "The Button", category: "Buttons & Actions" },
  { id: "button-group", title: "The Button Group", category: "Layout" },
  { id: "card", title: "The Card", category: "Layout" },
  { id: "checkbox", title: "The Checkbox", category: "Forms & Inputs" },
  {
    id: "checkbox-group",
    title: "The CheckboxGroup",
    category: "Forms & Inputs",
  },
  { id: "collapsible", title: "The Collapsible", category: "Data Display" },
  { id: "combobox", title: "The Combobox", category: "Forms & Inputs" },
  { id: "context-menu", title: "The Context Menu", category: "Overlays" },
  { id: "dialog", title: "The Dialog", category: "Overlays" },
  { id: "drawer", title: "The Drawer", category: "Overlays" },
  { id: "dropdown-menu", title: "The Dropdown Menu", category: "Overlays" },
  { id: "field", title: "The Field", category: "Forms & Inputs" },
  { id: "fieldset", title: "The Fieldset", category: "Forms & Inputs" },
  { id: "hover-card", title: "The Hover Card", category: "Overlays" },
  { id: "input", title: "The Input", category: "Forms & Inputs" },
  { id: "input-group", title: "The Input Group", category: "Forms & Inputs" },
  { id: "input-otp", title: "The InputOTP", category: "Forms & Inputs" },
  { id: "item", title: "The Item", category: "Layout" },
  { id: "kbd", title: "The Kbd", category: "Data Display" },
  { id: "menubar", title: "The Menubar", category: "Navigation" },
  { id: "meter", title: "The Meter", category: "Data Display" },
  {
    id: "navigation-menu",
    title: "The Navigation Menu",
    category: "Navigation",
  },
  { id: "number-field", title: "The Number Field", category: "Forms & Inputs" },
  { id: "pagination", title: "The Pagination", category: "Navigation" },
  { id: "popover", title: "The Popover", category: "Overlays" },
  { id: "progress", title: "The Progress", category: "Feedback" },
  { id: "radio-group", title: "The Radio Group", category: "Forms & Inputs" },
  { id: "scroll-area", title: "The ScrollArea", category: "Layout" },
  { id: "select", title: "The Select", category: "Forms & Inputs" },
  { id: "separator", title: "The Separator", category: "Layout" },
  { id: "skeleton", title: "The Skeleton", category: "Feedback" },
  { id: "slider", title: "The Slider", category: "Forms & Inputs" },
  { id: "spinner", title: "The Spinner", category: "Feedback" },
  { id: "switch", title: "The Switch", category: "Forms & Inputs" },
  { id: "table", title: "The Table", category: "Data Display" },
  { id: "tabs", title: "The Tabs", category: "Navigation" },
  { id: "text-link", title: "The Text Link", category: "Navigation" },
  { id: "textarea", title: "The Textarea", category: "Forms & Inputs" },
  { id: "toast", title: "The Toast", category: "Feedback" },
  { id: "toggle", title: "The Toggle", category: "Forms & Inputs" },
  { id: "toggle-group", title: "The Toggle Group", category: "Forms & Inputs" },
  { id: "toolbar", title: "The Toolbar", category: "Navigation" },
  { id: "tooltip", title: "The Tooltip", category: "Overlays" },
];
