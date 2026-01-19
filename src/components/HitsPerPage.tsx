import { useHitsPerPage, UseHitsPerPageProps } from "react-instantsearch";
import { Select, SelectItem } from "@heroui/react";

export default function HitsPerPage(props: UseHitsPerPageProps) {
  const { items, refine } = useHitsPerPage(props);
  const { value: currentValue } =
    items.find(({ isRefined }) => isRefined)! || {};

  return (
    <Select
      onSelectionChange={(v) => v.currentKey && refine(Number(v.currentKey))}
      defaultSelectedKeys={[String(currentValue)]}
      variant="bordered"
    >
      {items.map((item) => (
        <SelectItem key={item.value}>{item.label}</SelectItem>
      ))}
    </Select>
  );
}
