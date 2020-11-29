import { Moment } from "moment";

type IsDateInRange = (options: {
  date: Moment;
  min?: Moment;
  max?: Moment;
}) => Moment;

export const validateDate: IsDateInRange = ({ date, min, max }) => {
  if (min && date.isBefore(min, "day")) {
    return min;
  }

  if (max && date.isAfter(max, "day")) {
    return max;
  }

  return date;
};
