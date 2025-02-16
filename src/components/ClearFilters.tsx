import { useClearRefinements } from "react-instantsearch";
import { Button } from "@heroui/button";

export function ClearFilters() {
  const { refine, canRefine } = useClearRefinements();

  return (
    <div className="ais-ClearRefinements">
      <Button
        className={`ais-ClearRefinements-button ${
          !canRefine ? "ais-ClearRefinements-button--disabled" : ""
        }`}
        color={"primary"}
        isDisabled={!canRefine}
        size={"sm"}
        onPress={refine}
      >
        <div className="clear-filters">清除筛选</div>
      </Button>
    </div>
  );
}
