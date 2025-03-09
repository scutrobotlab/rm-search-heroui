import { useInstantSearch } from "react-instantsearch";

import { formatNumber } from "../utils";

export function SaveFiltersMobile({ onClick }: { onClick: () => void }) {
  const {
    results: { nbHits },
  } = useInstantSearch();

  return (
    <button className="button button-primary" onClick={onClick}>
      浏览 {formatNumber(nbHits)} 条结果
    </button>
  );
}
