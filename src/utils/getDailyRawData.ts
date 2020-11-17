import Axios from "axios";
import moment, { Moment } from "moment";
import { API_DATE_FORMAT, API_URL } from "../constants/api";
import { CacheValue } from "../contexts/Cache";
import { CountriesDailyDataResponse } from "../types/CountryDataResponse";
import { DailyRawData } from "../types/Data";
import { MyCountry } from "../types/MyCountry";

export const getDailyRawData = async (
  country: MyCountry,
  date: Moment,
  cache: CacheValue
): Promise<DailyRawData> => {
  const formatedDate = date.format(API_DATE_FORMAT);

  const cacheCountryDailyDataKey = `${formatedDate}:${country.value}`;
  const cachedDailyData = cache.getItem(cacheCountryDailyDataKey);
  if (cachedDailyData) {
    return cachedDailyData;
  }

  const url = `${API_URL}/daily/${formatedDate}`;

  const cachedResponse = cache.getItem(url);
  let rawData: CountriesDailyDataResponse;
  if (cachedResponse) {
    rawData = cachedResponse;
    console.log(rawData);
  } else {
    const response = await Axios.get(url);
    rawData = await response.data;
    cache.addItem(url, rawData);
  }

  const filteredCountriesData = rawData.filter(
    ({ countryRegion }) =>
      countryRegion.toLowerCase() === country.name.toLowerCase()
  );

  if (filteredCountriesData.length) {
    return filteredCountriesData.reduce<DailyRawData>(
      (result, { confirmed, deaths, recovered, active, lastUpdate }) => {
        const newResult: DailyRawData = {
          confirmed: result.confirmed + Number(confirmed),
          deaths: result.deaths + Number(deaths),
          recovered: result.recovered + Number(recovered),
          active: result.active + Number(active),
          updatedAt: moment(lastUpdate),
        };
        return newResult;
      },
      {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
        active: 0,
        updatedAt: moment(),
      }
    );
  }

  const {
    confirmed,
    deaths,
    recovered,
    active,
    lastUpdate,
  } = filteredCountriesData[0];

  const dailyData = {
    confirmed: Number(confirmed),
    deaths: Number(deaths),
    recovered: Number(recovered),
    active: Number(active),
    updatedAt: moment(lastUpdate),
  };

  cache.addItem(cacheCountryDailyDataKey, dailyData);

  return dailyData;
};
