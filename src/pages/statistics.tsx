import { useMemo, useEffect, useState } from "react";
import { VChart, VChartProps } from "@visactor/react-vchart";

import DefaultLayout from "@/layouts/default.tsx";
import { title } from "@/components/primitives.ts";

export default function StatisticsPage() {
  const [WordCloudData, setWordCloudData] = useState<
    { word: string; count: number }[]
  >([]);

  const spec = useMemo(() => {
    return {
      type: "wordCloud",
      nameField: "word",
      valueField: "count",
      seriesField: "word",
      data: {
        name: "WordCloudData",
        values: WordCloudData,
      },
    } as VChartProps["spec"];
  }, [WordCloudData]);

  // 组件挂载后获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statistics/word-cloud");

        if (!response.ok) {
          throw new Error("网络响应失败");
        }
        const resp = await response.json();

        setWordCloudData(resp["data"]);
      } catch (error) {
        console.error("获取数据时出错:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>统计</h1>
        </div>
      </section>

      <div>
        <VChart spec={spec} />
      </div>
    </DefaultLayout>
  );
}
