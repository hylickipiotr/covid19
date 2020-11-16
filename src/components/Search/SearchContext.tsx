import moment, { Moment } from "moment";
import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Data } from "../../types/Data";
import { MyCountry } from "../../types/MyCountry";
import { getCountries } from "../../utils/getCountries";
import { getCountryData } from "../../utils/getCountryData";
import { mapCountriesName } from "../../utils/mapCountriesName";

export type TCountry = MyCountry | null;
export type TDate = Moment;
export type TData = Data | null;

export interface SearchContextValue {
  country: TCountry;
  date: TDate;
  countries: MyCountry[];
  countryData: TData;
  fetching: boolean;

  setCountries: React.Dispatch<React.SetStateAction<MyCountry[]>>;
  setCountry: (countryCode: string) => void;
  setDate: React.Dispatch<React.SetStateAction<TDate>>;
  setCountryData: React.Dispatch<React.SetStateAction<TData>>;
}

export const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider: React.FC<{}> = ({ children }) => {
  const { query, ...router } = useRouter();
  const { c: queryCountry } = query;
  const [date, setDate] = useState<TDate>(moment());
  const [countries, setCountries] = useState<MyCountry[]>([]);
  const [cachedCountries, setCachedCountries] = useState<
    Record<string, MyCountry>
  >({});
  const [countryData, setCountryData] = useState<TData>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const setCountryFromQuery = (): MyCountry | null => {
    if (!queryCountry) {
      return null;
    }

    const countryCode =
      typeof queryCountry === "string" ? queryCountry : queryCountry[0];

    const cc = cachedCountries[countryCode.toLowerCase()];
    if (cc) {
      return cc;
    }

    const c = countries.find((v) => {
      return v.value.toLowerCase() === countryCode.toLowerCase();
    });

    if (c) {
      setCachedCountries((currentCachedCountries) => ({
        ...currentCachedCountries,
        [c.value.toLowerCase()]: c,
      }));
      return c;
    }

    return null;
  };

  const setCountryFn: SearchContextValue["setCountry"] = (countryCode) => {
    router.push({
      query: { c: countryCode.toLowerCase() },
    });
  };

  useEffect(() => {
    const setInitCountries = async () => {
      const c = await getCountries();
      const m = mapCountriesName(c);
      setCountries(m);
    };

    setInitCountries();
  }, []);

  const country = useMemo<TCountry>(() => setCountryFromQuery(), [query]);

  useEffect(() => {
    const fetchCountryData = async () => {
      setFetching(true);
      if (!country) return;
      const countryData = await getCountryData(country.value, new Date());

      setCountryData(countryData);
      setFetching(false);
    };

    fetchCountryData();
  }, [country]);

  return (
    <SearchContext.Provider
      value={{
        countries,
        country,
        date,
        countryData,
        fetching,
        setCountryData,
        setCountries,
        setCountry: setCountryFn,
        setDate,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const SearchConsumer = SearchContext.Consumer;

export const useSearchContext = () => {
  const search = useContext(SearchContext);

  if (!!!search) {
    throw new Error(
      "Search context is undefined, please verify you are calling useSearchContext() as child of a <SearchProvider> component."
    );
  }

  return search;
};
