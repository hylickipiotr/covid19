import { Moment } from "moment";
import { CacheValue } from "../contexts/Cache";
import { Country } from "../types/Country";
import { DailyRawData } from "../types/Data";
import { INPUT_DATE_FORMAT } from "./formatDateInput";
import { getHistoricalData } from "./getHistoricalData";

export const getDailyData = async (
  country: Country,
  date: Moment,
  cache: CacheValue
): Promise<DailyRawData> => {
  const formatedDate = date.format(INPUT_DATE_FORMAT);
  const cachedCountryData = cache.getItem(country.iso2);
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

  cache.addItem(country.iso2, {
    ...cache.getItem(country.iso2),
    historical: historicalData,
    daily: {
      ...cache.getItem(country.iso2)?.daily,
      [formatedDate]: dailyDataIndex,
    },
    minDate: historicalData[0].updatedAt,
  });

  return dailyData;
};
