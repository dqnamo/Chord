import { Table } from "@/components/public/Table";
import type { ShowcaseDef } from "@/helpers/showcase";

const showcase: ShowcaseDef = {
  id: "table",
  title: "The Table",
  category: "Data Display",
  file: "Table.tsx",
  usage: `import { Table } from "@/components/public/Table";

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Invoice</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>INV-001</Table.Cell>
      <Table.Cell>Paid</Table.Cell>
      <Table.Cell>$250.00</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>`,
  previewTabs: [
    {
      value: "default",
      label: "Default",
      content: (
        <Table.Root className="w-72">
          <Table.Header>
            <Table.Row>
              <Table.Head>Invoice</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head>Amount</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>INV-001</Table.Cell>
              <Table.Cell>Paid</Table.Cell>
              <Table.Cell>$250.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>INV-002</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell>$120.00</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>INV-003</Table.Cell>
              <Table.Cell>Overdue</Table.Cell>
              <Table.Cell>$80.00</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      ),
    },
  ],
};

export default showcase;
