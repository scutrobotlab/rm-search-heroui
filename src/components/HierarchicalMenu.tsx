import { Fragment, useEffect, useState } from "react";
import {
  useHierarchicalMenu,
  UseHierarchicalMenuProps,
} from "react-instantsearch";
import { Button, Chip } from "@heroui/react";
import { ChevronDownIcon } from "tdesign-icons-react";
import { HierarchicalMenuItem } from "instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu";
import { Listbox, ListboxItem } from "@heroui/listbox";

export default function HierarchicalMenu(
  props: UseHierarchicalMenuProps & {
    label: string;
  },
) {
  const {
    items,
    refine,
    canToggleShowMore,
    toggleShowMore,
    isShowingMore,
    createURL,
  } = useHierarchicalMenu(props);

  return (
    <div>
      <h3 className="text-sm font-medium">{props.label}</h3>

      <HierarchicalList
        items={items}
        onNavigate={refine}
        createURL={createURL}
        margin={0}
      />

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

type HierarchicalListProps = Pick<
  ReturnType<typeof useHierarchicalMenu>,
  "items" | "createURL"
> & {
  onNavigate(value: string): void;
};

function HierarchicalList({
  items,
  onNavigate,
}: HierarchicalListProps & { label?: string; margin?: number }) {
  if (items.length === 0) {
    return null;
  }

  const [selected, setSelected] = useState<string>();
  useEffect(() => {
    if (!selected) {
      return;
    }
    onNavigate(selected.split(":")[0]);
  }, [selected]);

  const renderItems = (items: HierarchicalMenuItem[], parent?: string) => {
    return items.map((item) => (
      <Fragment key={item.value}>
        <ListboxItem
          startContent={
            item.data ? (
              <ChevronDownIcon />
            ) : parent ? (
              <span className="w-2"></span>
            ) : (
              ""
            )
          }
          endContent={
            <Chip size="sm" variant="flat" className="h-5 text-[10px]">
              {item.count}
            </Chip>
          }
          key={item.value}
          onPress={() => setSelected(item.value)}
        >
          {item.label}
        </ListboxItem>

        {item.data && renderItems(item.data, item.value)}
      </Fragment>
    ));
  };

  return (
    <Listbox selectedKeys={selected} onAction={(v) => setSelected(v as string)}>
      {renderItems(
        items.sort((a, b) => {
          return a.label.localeCompare(b.label);
        }),
      )}
    </Listbox>
  );
}
