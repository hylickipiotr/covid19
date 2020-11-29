import { Moment } from "moment";
import { CachedCoutry } from "../../contexts/Search/search.type";
import { DailyRawData } from "../../types/Data";
import { isToday } from "../../utils/isToday";
import { TCardType } from "../Card/Card";

const getHistoricalSpecificTypeData = (
  historical: DailyRawData[],
  type: TCardType
): Array<number> => historical.map((data) => data[type]);

export const prepareChartData = ({
  type,
  date,
  countryData,
}: {
  type: TCardType;
  date: Moment;
  countryData: CachedCoutry;
}): Array<number> => {
  const { today, historical } = countryData;
  const isTodayDate = isToday(date);
  const historicalData: DailyRawData[] = [];
  historical?.forEach((data) => {
    if (!data.updatedAt.isSameOrBefore(date, "d")) {
      return;
    }
    historicalData.push(data);
  });

  const data = [
    ...getHistoricalSpecificTypeData(historicalData, type),
    ...(isTodayDate && today ? [today[type]] : []),
  ];

  return data.slice(Math.max(data.length - 30));
};
