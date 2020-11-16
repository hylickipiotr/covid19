import Axios from "axios";
import moment from "moment";
import { API_URL } from "../constants/api";
import { CountryDataResponse } from "../types/CountryDataResponse";
import { Data } from "../types/Data";

export const getCountryData = async (
  country: string,
  date: Date
): Promise<Data> => {
  const response = await Axios.get(`${API_URL}/countries/${country}`);
  const data: CountryDataResponse = await response.data;

  const confirmed = data.confirmed.value;
  const deaths = data.deaths.value;
  const recoverd = data.recovered.value;
  const active = confirmed - recoverd - deaths;
  const updatedAt = moment(data.lastUpdate);

  return {
    confirmed,
    deaths,
    recoverd,
    active,
    updatedAt,
  };
};
