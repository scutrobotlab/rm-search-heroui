import { useEffect, useState } from "react";
import { WordCloudChart } from "@visactor/react-vchart";

import { title } from "@/components/primitives.ts";
import { useTheme } from "@/hooks/use-theme.tsx";

export default function StatisticsPage() {
  const [wordCloudData, setWordCloudData] = useState<
    { word: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        // 无论成功或失败，都结束加载状态
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChartClick = (e: any) => {
    const word = e?.datum?.word;

    if (!word) return;

    window.location.href = `/search/?query=${word}`;
  };

  const { theme } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mt-20">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>统计</h1>
      </div>

      <b className={"text-2xl mt-4"}>搜索词云</b>
      {!isLoading && (
        <WordCloudChart
          nameField="word"
          valueField="count"
          seriesField="word"
          theme={theme}
          data={{
            name: "WordCloudData",
            values: wordCloudData,
          }}
          onClick={onChartClick}
        />
      )}
    </section>
  );
}
