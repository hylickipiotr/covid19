import { Option } from "react-select/src/filters";
import { MyCountry } from "../types/MyCountry";

export const filterCountries = (option: Option, input: string) => {
  const data: MyCountry = option.data;
  return !!Object.values(data).filter((value: string) => {
    return value.toLowerCase().includes(input.toLowerCase()) ? true : false;
  }).length;
};
