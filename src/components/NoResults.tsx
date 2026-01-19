import { useInstantSearch } from "react-instantsearch";

import { SearchErrorFilledIcon } from "tdesign-icons-react";
import { Spacer } from "@heroui/react";

export function NoResults() {
  const { results } = useInstantSearch();

  const hasRefinements = results.getRefinements().length > 0;
  const description = hasRefinements
    ? "请尝试重置已应用的筛选器。"
    : "请尝试另一个查询。";

  return (
    <div className="hits-empty-state">
      <SearchErrorFilledIcon size={"100px"} />

      <Spacer y={10} />

      <p className="hits-empty-state-title">抱歉，我们找不到任何结果</p>
      <p className="hits-empty-state-description">{description}</p>
    </div>
  );
}
