import { Pagination } from "@/components/public/Pagination";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "pagination",
  title: "The Pagination",
  category: "Navigation",
  file: "Pagination.tsx",
  usage: `import { Pagination } from "@/components/public/Pagination";

<Pagination.Root>
  <Pagination.List>
    <Pagination.Previous>Prev</Pagination.Previous>
    <Pagination.Item>1</Pagination.Item>
    <Pagination.Item isActive>2</Pagination.Item>
    <Pagination.Item>3</Pagination.Item>
    <Pagination.Next>Next</Pagination.Next>
  </Pagination.List>
</Pagination.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Pagination.Root>
          <Pagination.List>
            <Pagination.Previous>Prev</Pagination.Previous>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item isActive>2</Pagination.Item>
            <Pagination.Item>3</Pagination.Item>
            <Pagination.Item>4</Pagination.Item>
            <Pagination.Item>5</Pagination.Item>
            <Pagination.Next>Next</Pagination.Next>
          </Pagination.List>
        </Pagination.Root>
      ),
    },
  ],
};

export default showcase;
