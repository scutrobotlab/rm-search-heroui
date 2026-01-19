import { useStats } from "react-instantsearch";
import { addToast } from "@heroui/react";
import { Logo } from "@/components/Icons.tsx";
import { useEffect } from "react";

export default function Stats() {
  const { nbHits, processingTimeMS } = useStats();

  const hits = nbHits >= 1000 ? "1000+" : `${nbHits}`;

  const push = () => {
    if (nbHits === 0) {
      return;
    }

    addToast({
      title: `${processingTimeMS}ms 内为你找到 ${hits} 条结果`,
      shouldShowTimeoutProgress: true,
      timeout: 3000,
      icon: <Logo />,
      variant: "bordered",
    });
  };

  useEffect(() => {
    push();
  }, [nbHits, processingTimeMS]);

  return <div style={{ display: "none" }}></div>;
}
