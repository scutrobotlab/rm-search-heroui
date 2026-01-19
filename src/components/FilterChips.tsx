import {
  useClearRefinements,
  useCurrentRefinements,
} from "react-instantsearch";
import { Chip } from "@heroui/react";
import { hashColor } from "@/utils";
import { Button } from "@heroui/button";

export default function FilterChips(props: { disableClearButton?: boolean }) {
  const { items, canRefine } = useCurrentRefinements();
  const { refine, canRefine: ccr } = useClearRefinements();

  if (!canRefine || items.length === 0 || !canRefine) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          return item.refinements.map((r) => (
            <Chip
              key={`${item.attribute}:${r.attribute}`}
              size="sm"
              isCloseable
              onClose={() => item.refine(r)}
              variant="flat"
              color={hashColor(item.attribute)}
            >
              {r.label}
            </Chip>
          ));
        })}
      </div>

      {!props.disableClearButton && (
        <Button
          isDisabled={!ccr}
          size={"sm"}
          onPress={refine}
          color="warning"
          variant="bordered"
        >
          清除筛选
        </Button>
      )}
    </div>
  );
}
