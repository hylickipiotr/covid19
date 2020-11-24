import moment, { Moment } from "moment";
import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { COUNTRIES } from "../constants/countries";
import { ROUTE } from "../constants/routes";
import { Country } from "../types/Country";
import { DailyData } from "../types/Data";
import { INPUT_DATE_FORMAT } from "../utils/formatDateInput";
import { getCountryData } from "../utils/getCountryData";
import { useCache } from "./Cache";

export type TCountry = Country | null;
export type TDate = Moment;
export type TData = DailyData | null;

export interface CountryContextValue {
  country: TCountry;
  date: TDate;
  countryData: TData;
  fetching: boolean;

  setCountry: (countryCode: string) => void;
  setDate: (date: TDate) => void;
  setCountryData: React.Dispatch<React.SetStateAction<TData>>;
  setPrevDayDate: () => void;
  setNextDayDate: () => void;
}

export const CountryContext = createContext<CountryContextValue | null>(null);

export const CountryProvider: React.FC<{}> = ({ children }) => {
  const cache = useCache();
  const { query, ...router } = useRouter();
  const { date: queryDate } = query;

  const [countryData, setCountryData] = useState<TData>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const setCountryFromQuery = (): TCountry => {
    const countryCode = router.asPath.match(/^\/country\/(\w*)/);

    if (!countryCode) {
      return null;
    }

    const c = COUNTRIES[countryCode[1].toUpperCase()];

    if (!c) {
      return null;
    }
    return c;
  };

  const setDateFromQuery = (): TDate => {
    if (!queryDate) {
      return moment();
    }

    return moment(queryDate, INPUT_DATE_FORMAT);
  };

  const country = useMemo<TCountry>(() => setCountryFromQuery(), [
    router.asPath,
  ]);
  const date = useMemo<TDate>(() => setDateFromQuery(), [queryDate]);

  useEffect(() => {
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
  }, [country, router.asPath, queryDate]);

  const setCountryFn: CountryContextValue["setCountry"] = (countryCode) => {
    router.push(`${ROUTE.COUNTRY}/${countryCode}`);
  };

  const setDateFn: CountryContextValue["setDate"] = (dateValue) => {
    let queryDate: Moment;
    const now = moment();
    const minDate = cache.getItem(country?.iso2)?.minDate || now;

    if (dateValue.isBefore(minDate, "day")) {
      queryDate = minDate;
    } else if (dateValue.isAfter(now, "day")) {
      queryDate = now;
    } else {
      queryDate = dateValue;
    }
    router.push(`${country?.iso2}?date=${queryDate.format(INPUT_DATE_FORMAT)}`);
  };
  const setPrevDayDate = () => {
    setDateFn(moment(date).subtract(1, "day"));
  };

  const setNextDayDate = () => {
    setDateFn(moment(date).add(1, "day"));
  };

  return (
    <CountryContext.Provider
      value={{
        country,
        date,
        countryData,
        fetching,
        setCountryData,
        setCountry: setCountryFn,
        setDate: setDateFn,
        setPrevDayDate,
        setNextDayDate,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const CountryConsumer = CountryContext.Consumer;

export const useCountryContext = () => {
  const country = useContext(CountryContext);

  if (!!!country) {
    throw new Error(
      "Country context is undefined, please verify you are calling useCountryContext() as child of a <CountryProvider> component."
    );
  }

  return country;
};
