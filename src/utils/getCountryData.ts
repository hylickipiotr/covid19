import moment from "moment";
import { Moment } from "moment";
import { DailyData } from "../types/Data";
import { MyCountry } from "../types/MyCountry";
import { createDailyData } from "./createDailyData";
import { getDailyRawData } from "./getDailyRawData";
import { getTodayRawData } from "./getTodayRawData";
import { isToday } from "./isToday";

export const getCountryData = async (
  country: MyCountry,
  date: Moment
): Promise<DailyData> => {
  let data;
  if (isToday(date)) {
    data = await getTodayRawData(country);
  } else {
    data = await getDailyRawData(country, date);
  }

  const previousDayData = await getDailyRawData(
    country,
    moment(date).subtract(1, "day")
  );
  return createDailyData(data, previousDayData);
};
