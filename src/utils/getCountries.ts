import Axios from "axios";
import { API_MATHDRO_URL } from "../constants/api";
import { CountriesResponse } from "../types/CountriesResponse";
import { Country } from "../types/Country";

export const getCountries = async (): Promise<Country[]> => {
  const response = await Axios.get(`${API_MATHDRO_URL}/countries`);
  const data: CountriesResponse = await response.data;
  return data.countries || [];
};
