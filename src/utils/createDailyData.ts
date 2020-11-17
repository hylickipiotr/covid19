import { DailyData, DailyRawData, ValueType } from "../types/Data";

export const createValue = (
  value: number,
  previousDayValue: number
): ValueType => ({
  value,
  previousDayValue,
  growth: value - previousDayValue,
});

export const createDailyData = (
  data: DailyRawData,
  previousDayData: DailyRawData
): DailyData => {
  const { active, confirmed, recovered, deaths, updatedAt } = data;
  const {
    active: pAcitve,
    confirmed: pConfirmed,
    recovered: pRecovered,
    deaths: pDeadth,
  } = previousDayData;

  return {
    active: createValue(active, pAcitve),
    confirmed: createValue(confirmed, pConfirmed),
    recovered: createValue(recovered, pRecovered),
    deaths: createValue(deaths, pDeadth),
    updatedAt: updatedAt,
  };
};
