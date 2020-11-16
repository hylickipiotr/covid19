import { Moment } from "moment";
import { Data } from "../types/Data";
import { MyCountry } from "../types/MyCountry";
import { getDailyRawData } from "./getDailyRawData";
import { getTodayRawData } from "./getTodayRawData";
import { isToday } from "./isToday";

export const getCountryData = async (
  country: MyCountry,
  date: Moment
): Promise<Data> => {
  if (isToday(date)) {
    return await getTodayRawData(country);
  }

  return await getDailyRawData(country, date);
};
