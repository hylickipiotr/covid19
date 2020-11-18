import { Moment } from "moment";
import { CacheValue } from "../contexts/Cache";
import { DailyRawData } from "../types/Data";
import { MyCountry } from "../types/MyCountry";
import { INPUT_DATE_FORMAT } from "./formatDateInput";
import { getHistoricalData } from "./getHistoricalData";

export const getDailyData = async (
  country: MyCountry,
  date: Moment,
  cache: CacheValue
): Promise<DailyRawData> => {
  const formatedDate = date.format(INPUT_DATE_FORMAT);
  const cachedCountryData = cache.getItem(country.value);
  const cachedDaily = cachedCountryData?.daily;
  if (
    cachedDaily &&
    cachedDaily[formatedDate] &&
    cachedCountryData?.historical
  ) {
    return cachedCountryData?.historical[cachedDaily[formatedDate]];
  }

  const [historicalData, dailyDataIndex] = await getHistoricalData(
    country,
    date,
    cache
  );

  const dailyData = historicalData[dailyDataIndex];

  cache.addItem(country.value, {
    ...cache.getItem(country.value),
    historical: historicalData,
    daily: {
      ...cache.getItem(country.value)?.daily,
      [formatedDate]: dailyDataIndex,
    },
    minDate: historicalData[0].updatedAt,
  });

  return dailyData;
};
