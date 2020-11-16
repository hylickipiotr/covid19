import { COUNTRIES } from "../constants/countries";
import { Country } from "../types/Country";
import { MyCountry } from "../types/MyCountry";

export const mapCountriesName = (countries: Country[]): MyCountry[] => {
  const mappedCountries = countries.reduce<MyCountry[]>(
    (result, { iso2, iso3, name }) => {
      const c = COUNTRIES[iso2];

      if (!c) return result;
      const { name_pl, name_en } = c;
      return [
        ...result,
        {
          label: name_pl,
          name_en,
          name: name,
          value: iso2,
          iso3,
        },
      ];
    },
    []
  );

  return mappedCountries;
};
