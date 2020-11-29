import moment from "moment";
import { DailyData, GetData } from "../types/Data";
import { createDailyData } from "./createDailyData";
import { getDailyData } from "./getDailyData";
import { getTodayData } from "./getTodayData";
import { isToday } from "./isToday";

export const getData: GetData<DailyData> = async ({
  country,
  date,
  cache,
  cacheData,
}) => {
  let data;

  if (isToday(date)) {
    data = await getTodayData({ country });
  } else {
    data = await getDailyData({ country, date, cache, cacheData });
  }

  const previousDayDate = moment(date).subtract(1, "day");
  const previousDayData = await getDailyData({
    country,
    date: previousDayDate,
    cache,
    cacheData,
  });
  return createDailyData(data, previousDayData);
};
