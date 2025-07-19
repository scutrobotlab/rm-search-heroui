import { useMemo } from "react";
import { VChart, VChartProps } from "@visactor/react-vchart";

import DefaultLayout from "@/layouts/default.tsx";
import { title } from "@/components/primitives.ts";

const WordCloudData = [
  { word: "React", value: 100, style: { fill: "#3b82f6" } },
  { word: "VChart", value: 80, style: { fill: "#10b981" } },
  { word: "可视化", value: 70, style: { fill: "#f59e0b" } },
  { word: "词云", value: 65, style: { fill: "#8b5cf6" } },
  { word: "数据", value: 60, style: { fill: "#ec4899" } },
  { word: "前端", value: 55, style: { fill: "#6366f1" } },
  { word: "JavaScript", value: 50, style: { fill: "#ef4444" } },
  { word: "TypeScript", value: 45, style: { fill: "#06b6d4" } },
  { word: "图表", value: 40, style: { fill: "#14b8a6" } },
  { word: "交互", value: 35, style: { fill: "#f97316" } },
  { word: "组件", value: 30, style: { fill: "#84cc16" } },
  { word: "UI", value: 25, style: { fill: "#a855f7" } },
  { word: "用户体验", value: 20, style: { fill: "#ec4899" } },
  { word: "开发", value: 18, style: { fill: "#3b82f6" } },
  { word: "设计", value: 15, style: { fill: "#10b981" } },
  { word: "性能", value: 12, style: { fill: "#f59e0b" } },
  { word: "优化", value: 10, style: { fill: "#8b5cf6" } },
];

export default function StatisticsPage() {
  const spec = useMemo(() => {
    return {
      type: "wordCloud",
      nameField: "word",
      valueField: "value",
      seriesField: "word",
      data: {
        name: "WordCloudData",
        values: WordCloudData,
      },
    } as VChartProps["spec"];
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>统计</h1>
        </div>
      </section>

      <div>
        <VChart spec={spec} />;
      </div>
    </DefaultLayout>
  );
}
