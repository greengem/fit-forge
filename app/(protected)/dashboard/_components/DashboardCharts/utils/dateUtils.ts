import {
  subDays,
  subWeeks,
  subMonths,
  subYears,
  startOfWeek,
  startOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  startOfDay,
  endOfDay,
  endOfWeek,
  endOfMonth,
} from "date-fns";

export function calculateStartDate(
  dateRange: "3D" | "1W" | "1M" | "3M" | "1Y",
) {
  switch (dateRange) {
    case "3D":
      return subDays(new Date(), 3);
    case "1W":
      return subWeeks(new Date(), 1);
    case "1M":
      return subMonths(new Date(), 1);
    case "3M":
      return subMonths(new Date(), 3);
    case "1Y":
      return subYears(new Date(), 1);
    default:
      return subMonths(new Date(), 3);
  }
}

export const calculateIntervals = (dateRange: string) => {
  const startDate = calculateStartDate(
    dateRange as "3D" | "1W" | "1M" | "3M" | "1Y",
  );
  let intervals;

  switch (dateRange) {
    case "3D":
    case "1W":
      intervals = eachDayOfInterval({ start: startDate, end: new Date() });
      break;
    case "1M":
    case "3M":
      intervals = eachWeekOfInterval(
        { start: startDate, end: new Date() },
        { weekStartsOn: 1 },
      );
      break;
    case "1Y":
      intervals = eachMonthOfInterval({ start: startDate, end: new Date() });
      break;
    default:
      intervals = eachWeekOfInterval(
        { start: startDate, end: new Date() },
        { weekStartsOn: 1 },
      );
      break;
  }

  return intervals;
};

export const getIntervalStartAndEndDates = (
  interval: Date,
  dateRange: string,
) => {
  let startOfInterval: Date;
  let endOfInterval: Date;

  if (["3D", "1W"].includes(dateRange)) {
    startOfInterval = startOfDay(interval);
    endOfInterval = endOfDay(interval);
  } else if (["1M", "3M"].includes(dateRange)) {
    startOfInterval = startOfWeek(interval, { weekStartsOn: 1 });
    endOfInterval = endOfWeek(interval, { weekStartsOn: 1 });
  } else if (dateRange === "1Y") {
    startOfInterval = startOfMonth(interval);
    endOfInterval = endOfMonth(interval);
  } else {
    startOfInterval = startOfWeek(interval, { weekStartsOn: 1 });
    endOfInterval = endOfWeek(interval, { weekStartsOn: 1 });
  }

  return { startOfInterval, endOfInterval };
};
