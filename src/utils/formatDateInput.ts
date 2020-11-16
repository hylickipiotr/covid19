import { Moment } from "moment";

export const INPUT_DATE_FORMAT = "YYYY-MM-DD";

export const formatDateInput = (date: Moment) => {
  return date.format(INPUT_DATE_FORMAT);
};
