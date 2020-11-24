import moment, { Moment } from "moment";
import { CacheValue } from "../contexts/Cache";
import { Country } from "../types/Country";
import { DailyData } from "../types/Data";
import { createDailyData } from "./createDailyData";
import { getDailyData } from "./getDailyData";
import { getTodayData } from "./getTodayData";
import { isToday } from "./isToday";

export const getCountryData = async (
  country: Country,
  date: Moment,
  cache: CacheValue
): Promise<DailyData> => {
  let data;

  if (isToday(date)) {
    data = await getTodayData(country);
  } else {
    data = await getDailyData(country, date, cache);
  }

  const previousDayDate = moment(date).subtract(1, "day");
  const previousDayData = await getDailyData(country, previousDayDate, cache);
  return createDailyData(data, previousDayData);
};
