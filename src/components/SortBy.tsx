import { useSortBy, UseSortByProps } from "react-instantsearch";
import { Select, SelectItem } from "@heroui/react";

export default function SortBy(props: UseSortByProps) {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <Select
      defaultSelectedKeys={[currentRefinement]}
      onSelectionChange={(v) => v.currentKey && refine(v.currentKey)}
      variant="bordered"
    >
      {options.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
