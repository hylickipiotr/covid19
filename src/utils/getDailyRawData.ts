import Axios from "axios";
import moment, { Moment } from "moment";
import { API_DATE_FORMAT, API_URL } from "../constants/api";
import { CountriesDailyDataResponse } from "../types/CountryDataResponse";
import { Data } from "../types/Data";
import { MyCountry } from "../types/MyCountry";

export const getDailyRawData = async (
  country: MyCountry,
  date: Moment
): Promise<Data> => {
  const formatedDate = date.format(API_DATE_FORMAT);
  const response = await Axios.get(`${API_URL}/daily/${formatedDate}`);
  const rawData: CountriesDailyDataResponse = await response.data;
  const filteredCountriesData = rawData.filter(
    ({ countryRegion }) =>
      countryRegion.toLowerCase() === country.name.toLowerCase()
  );

  if (filteredCountriesData.length) {
    return filteredCountriesData.reduce<Data>(
      (result, { confirmed, deaths, recovered, active, lastUpdate }) => {
        const newResult: Data = {
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
  return {
    confirmed: Number(confirmed),
    deaths: Number(deaths),
    recovered: Number(recovered),
    active: Number(active),
    updatedAt: moment(lastUpdate),
  };
};
