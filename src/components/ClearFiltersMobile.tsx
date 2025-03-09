import React from "react";
import { useClearRefinements } from "react-instantsearch";

export function ClearFiltersMobile({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { refine } = useClearRefinements();

  function onClick() {
    refine();
    document.body.classList.remove("filtering");
    containerRef.current!.scrollIntoView();
  }

  return (
    <div className="ais-ClearRefinements">
      <button className="ais-ClearRefinements-button" onClick={onClick}>
        清除筛选
      </button>
    </div>
  );
}
