import moment, { Moment } from "moment";
import { CacheValue } from "../contexts/Cache";
import { DailyData } from "../types/Data";
import { MyCountry } from "../types/MyCountry";
import { createDailyData } from "./createDailyData";
import { getDailyRawData } from "./getDailyRawData";
import { getTodayRawData } from "./getTodayRawData";
import { isToday } from "./isToday";

export const getCountryData = async (
  country: MyCountry,
  date: Moment,
  cache: CacheValue
): Promise<DailyData> => {
  let data;

  if (isToday(date)) {
    data = await getTodayRawData(country);
  } else {
    data = await getDailyRawData(country, date, cache);
  }

  const previousDayDate = moment(date).subtract(1, "day");
  const previousDayData = await getDailyRawData(
    country,
    previousDayDate,
    cache
  );
  return createDailyData(data, previousDayData);
};
