import { API_DEFAULT_COUNTRY_CODE } from "../../constants/api";

export const getCountryCodeFromPath = (path: string): string => {
  const countryCode = path.match(/^\/country\/(\w*)/);

  if (!countryCode) {
    return API_DEFAULT_COUNTRY_CODE;
  }

  return countryCode[1].toUpperCase();
};
