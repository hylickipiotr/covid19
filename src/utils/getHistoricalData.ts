import Axios from "axios";
import moment, { Moment } from "moment";
import { API_URL } from "../constants/api";
import { CacheValue } from "../contexts/Cache";
import { DailyRawData, HistoricalRawData } from "../types/Data";
import { MyCountry } from "../types/MyCountry";

type HistoricalResponse = HistoricalRawData[];

export const getHistoricalData = async (
  country: MyCountry,
  date: Moment,
  cache: CacheValue
): Promise<[DailyRawData[], number]> => {
  let dailyDataIndex = 0;
  const cachedHistoricalData: DailyRawData[] | undefined = cache.getItem(
    country.value
  )?.historical;
  if (cachedHistoricalData) {
    dailyDataIndex = cachedHistoricalData.findIndex(({ updatedAt }) =>
      updatedAt.isSame(date, "day")
    );
    return [cachedHistoricalData, dailyDataIndex >= 0 ? dailyDataIndex : 0];
  }

  const url = `${API_URL}/total/dayone/country/${country.value}`;
  const response = await Axios.get(url);
  const data: HistoricalResponse = await response.data;
  if (data.length === undefined) {
    return [[], 0];
  }

  const historicalData = data.map<DailyRawData>(
    ({ Active, Confirmed, Deaths, Recovered, Date }, i) => {
      if (!dailyDataIndex || moment(Date).isSame(date, "day")) {
        dailyDataIndex = i;
      }
      return {
        active: Active,
        confirmed: Confirmed,
        deaths: Deaths,
        recovered: Recovered,
        updatedAt: moment(Date),
      };
    }
  );

  return [historicalData, dailyDataIndex];
};
