import Axios from "axios";
import moment from "moment";
import { API_MATHDRO_URL } from "../constants/api";
import { CountryDataResponse } from "../types/CountryDataResponse";
import { DailyRawData } from "../types/Data";
import { MyCountry } from "../types/MyCountry";

export const getTodayData = async (
  country: MyCountry
): Promise<DailyRawData> => {
  const response = await Axios.get(
    `${API_MATHDRO_URL}/countries/${country.value}`
  );
  const data: CountryDataResponse = await response.data;

  const confirmed = data.confirmed.value;
  const deaths = data.deaths.value;
  const recovered = data.recovered.value;
  const active = confirmed - recovered - deaths;
  const updatedAt = moment(data.lastUpdate);

  return {
    confirmed,
    deaths,
    recovered: recovered,
    active,
    updatedAt,
  };
};
