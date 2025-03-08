import { useInstantSearch } from "react-instantsearch";
import { Progress } from "@heroui/progress";

export function Loading() {
  const { status } = useInstantSearch();
  const isLoading = status === "loading";

  return (
    <Progress
      isIndeterminate={true}
      size={"sm"}
      style={isLoading ? { visibility: "visible" } : { visibility: "hidden" }}
    />
  );
}
