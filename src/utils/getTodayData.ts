import Axios from "axios";
import moment from "moment";
import { API_MATHDRO_URL } from "../constants/api";
import { Country } from "../types/Country";
import { CountryDataResponse } from "../types/CountryDataResponse";
import { DailyRawData } from "../types/Data";

export const getTodayData = async ({
  country,
}: {
  country: Country;
}): Promise<DailyRawData> => {
  const response = await Axios.get(
    `${API_MATHDRO_URL}/countries/${country.iso2}`
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
