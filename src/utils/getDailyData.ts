import { DailyRawData, GetData } from "../types/Data";
import { INPUT_DATE_FORMAT } from "./formatDateInput";
import { getHistoricalData } from "./getHistoricalData";

export const getDailyData: GetData<DailyRawData> = async ({
  country,
  date,
  cache,
  cacheData,
}) => {
  const formatedDate = date.format(INPUT_DATE_FORMAT);
  const cachedCountryData = cache && cache[country.iso2];
  if (
    cachedCountryData &&
    cachedCountryData.daily[formatedDate] &&
    cachedCountryData.historical
  ) {
    const cachedDaily = cachedCountryData.daily;
    return cachedCountryData.historical[cachedDaily[formatedDate]];
  }

  const [historicalData, dailyDataIndex] = await getHistoricalData({
    country,
    date,
    cache,
    cacheData,
  });

  const dailyData = historicalData[dailyDataIndex];
  const cachedDaily = cache && cache[country.iso2]?.daily;
  const minDate = historicalData[0].updatedAt;
  cacheData({
    countryCode: country.iso2,
    data: {
      ...cache,
      historical: historicalData,
      daily: {
        ...cachedDaily,
        [formatedDate]: dailyDataIndex,
      },
      minDate,
    },
  });

  return dailyData;
};
