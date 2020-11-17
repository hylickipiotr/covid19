import moment, { Moment } from "moment";
import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCache } from "../../contexts/Cache";
import { DailyData } from "../../types/Data";
import { MyCountry } from "../../types/MyCountry";
import { INPUT_DATE_FORMAT } from "../../utils/formatDateInput";
import { getCountries } from "../../utils/getCountries";
import { getCountryData } from "../../utils/getCountryData";
import { mapCountriesName } from "../../utils/mapCountriesName";

export type TCountry = MyCountry | null;
export type TDate = Moment;
export type TData = DailyData | null;

export interface SearchContextValue {
  country: TCountry;
  date: TDate;
  countries: MyCountry[];
  countryData: TData;
  fetching: boolean;

  setCountries: React.Dispatch<React.SetStateAction<MyCountry[]>>;
  setCountry: (countryCode: string) => void;
  setDate: (date: TDate) => void;
  setCountryData: React.Dispatch<React.SetStateAction<TData>>;
}

export const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider: React.FC<{}> = ({ children }) => {
  const cache = useCache();
  const { query, ...router } = useRouter();
  const { c: queryCountry, d: queryDate } = query;
  const [countries, setCountries] = useState<MyCountry[]>([]);
  const [cachedCountries, setCachedCountries] = useState<
    Record<string, MyCountry>
  >({});
  const [countryData, setCountryData] = useState<TData>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const setCountryFromQuery = (): TCountry => {
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

  const setDateFromQuery = (): TDate => {
    if (!queryDate) {
      return moment();
    }

    return moment(queryDate, INPUT_DATE_FORMAT);
  };

  const country = useMemo<TCountry>(() => setCountryFromQuery(), [
    queryCountry,
  ]);
  const date = useMemo<TDate>(() => setDateFromQuery(), [queryDate]);

  useEffect(() => {
    const setInitCountries = async () => {
      const c = await getCountries();
      const m = mapCountriesName(c);
      setCountries(m);
    };

    setInitCountries();
    setCountryFromQuery();
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      setFetching(true);
      if (!country) return;
      const countryData = await getCountryData(country, date, cache);

      setCountryData(countryData);
      setFetching(false);
    };

    fetchCountryData();
  }, [country, queryCountry, queryDate]);

  const setCountryFn: SearchContextValue["setCountry"] = (countryCode) => {
    router.push({
      query: { ...query, c: countryCode.toLowerCase() },
    });
  };

  const setDateFn: SearchContextValue["setDate"] = (dateValue) => {
    router.push({
      query: { ...query, d: dateValue.format(INPUT_DATE_FORMAT) },
    });
  };

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
        setDate: setDateFn,
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
