import { DateRangePicker } from "@heroui/date-picker";
import { useRange, UseRangeProps } from "react-instantsearch";
import { useMemo } from "react";
import { fromDate, getLocalTimeZone } from "@internationalized/date";

export default function DateTimeRanger(
  props: UseRangeProps & {
    label: string;
  },
) {
  const { start, range, canRefine, refine } = useRange(props);

  const parseUnixMill = (v?: number) => {
    if (!v || v < 0 || isNaN(v) || !isFinite(v)) {
      return undefined;
    }

    return fromDate(new Date(v), getLocalTimeZone());
  };
  const value = useMemo(() => {
    return {
      start: parseUnixMill(start[0]) ?? parseUnixMill(range.min)!,
      end: parseUnixMill(start[1]) ?? parseUnixMill(range.max)!,
    };
  }, [start]);

  return (
    <>
      <h3 className="text-sm font-medium">{props.label}</h3>
      <DateRangePicker
        isDisabled={!canRefine}
        variant="bordered"
        firstDayOfWeek="mon"
        showMonthAndYearPickers
        value={value}
        hideTimeZone
        visibleMonths={2}
        minValue={parseUnixMill(range.min)!}
        maxValue={parseUnixMill(range.max)!}
        granularity={"day"}
        onChange={(v) => {
          if (!v) {
            refine([undefined, undefined]);
          } else {
            refine([v.start.toDate().getTime(), v.end.toDate().getTime()]);
          }
        }}
      />
    </>
  );
}
