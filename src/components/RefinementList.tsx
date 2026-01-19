import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import {
  Button,
  CheckboxGroup,
  Checkbox,
  Autocomplete,
  AutocompleteItem,
  Chip,
} from "@heroui/react";
import { useMemo } from "react";

export default function RefinementList(
  props: {
    label: string;
    searchable?: boolean;
    searchablePlaceholder?: string;
  } & UseRefinementListProps,
) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  const selected = useMemo(
    () => items.filter((item) => item.isRefined).map((item) => item.value),
    [items],
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium">{props.label}</h3>

      {props.searchable && (
        <Autocomplete
          size="sm"
          placeholder={props.searchablePlaceholder}
          onInputChange={(value) => searchForItems(value)}
          variant="bordered"
        >
          {items.map((item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          ))}
        </Autocomplete>
      )}

      <CheckboxGroup value={selected} style={{ width: "100%" }}>
        {items
          .sort((a, b) => {
            if (a.isRefined && !b.isRefined) {
              return -1;
            }
            if (!a.isRefined && b.isRefined) {
              return 1;
            }
            return a.label.localeCompare(b.label);
          })
          .map((item) => (
            <Checkbox
              key={item.value}
              value={item.value}
              onValueChange={() => refine(item.value)}
            >
              {item.label}
              <Chip size="sm" variant="flat" className="h-5 text-[10px]">
                {item.count}
              </Chip>
            </Checkbox>
          ))}
      </CheckboxGroup>

      {canToggleShowMore && (
        <Button
          variant="light"
          size="sm"
          onPress={toggleShowMore}
          className="mt-2"
        >
          {isShowingMore ? "收起" : "显示更多"}
        </Button>
      )}
    </div>
  );
}
