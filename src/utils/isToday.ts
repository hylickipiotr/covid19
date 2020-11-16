import moment, { Moment } from "moment";

export const isToday = (date: Moment): boolean => {
  return moment().isSame(date, "day");
};
