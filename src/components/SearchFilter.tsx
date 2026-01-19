import RefinementList from "@/components/RefinementList.tsx";
import { Spacer } from "@heroui/react";
import HierarchicalMenu from "@/components/HierarchicalMenu.tsx";
import DateTimeRanger from "@/components/DateTimeRanger.tsx";

export default function SearchFilter() {
  return (
    <div>
      <RefinementList label={"来源"} attribute={"source"} showMore />

      <Spacer y={4} />

      <HierarchicalMenu
        label="标签"
        showMore
        attributes={["category_lvl0", "category_lvl1"]}
        limit={8}
      />

      <Spacer y={4} />

      <RefinementList
        searchable
        searchablePlaceholder={"搜索学校"}
        label={"学校"}
        showMore
        attribute="college_name"
        limit={8}
      />

      <Spacer y={4} />

      <DateTimeRanger attribute={"create_time"} label={"创建时间"} />
    </div>
  );
}
