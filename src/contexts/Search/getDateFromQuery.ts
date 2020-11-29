import moment from "moment";
import { Moment } from "moment";
import { ParsedUrlQuery } from "querystring";
import { INPUT_DATE_FORMAT } from "../../utils/formatDateInput";

export const getDateFromQuery = (query: ParsedUrlQuery): Moment => {
  const date = query.date;

  if (!date) {
    return moment();
  }

  return moment(date, INPUT_DATE_FORMAT);
};
