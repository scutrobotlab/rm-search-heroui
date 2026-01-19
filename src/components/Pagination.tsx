import { usePagination, UsePaginationProps } from "react-instantsearch";
import { Pagination as HP } from "@heroui/react";

export default function Pagination(props: UsePaginationProps) {
  const { currentRefinement, nbPages, refine } = usePagination(props);

  return (
    <HP
      variant="faded"
      initialPage={currentRefinement + 1}
      total={nbPages}
      showControls
      showShadow
      onChange={(page) => refine(page - 1)}
    />
  );
}
