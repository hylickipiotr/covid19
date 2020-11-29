import { Moment } from "moment";
import { Route } from "../../constants/routes";
import { Country } from "../../types/Country";
import { INPUT_DATE_FORMAT } from "../../utils/formatDateInput";
import { isToday } from "../../utils/isToday";

export const createSearchPath = (country: Country, date: Moment) => {
  const path = isToday(date)
    ? `${country.iso2}`
    : `${country.iso2}?date=${date.format(INPUT_DATE_FORMAT)}`;
  const fullPath = `${Route.COUNTRY}/${path}`;
  return fullPath;
};
