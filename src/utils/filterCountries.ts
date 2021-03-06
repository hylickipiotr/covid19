import { Option } from "react-select/src/filters";
import { Country } from "../types/Country";

export const filterCountries = (option: Option, input: string) => {
  const data: Country = option.data;
  return !!Object.values(data).filter((value: string) => {
    return value.toLowerCase().includes(input.toLowerCase()) ? true : false;
  }).length;
};
