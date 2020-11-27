import moment, { Moment } from "moment";
import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { COUNTRIES } from "../constants/countries";
import { ROUTE } from "../constants/routes";
import { INPUT_DATE_FORMAT } from "../utils/formatDateInput";
import { getCountryData } from "../utils/getCountryData";
import { useCache } from "./Cache";
import {
  CountryContextValue,
  TData,
  TCountry,
  TDate,
  SetCountry,
  SetDate,
  SetPrevDayDate,
  SetNextDayDate,
} from "./country.type";

export const CountryContext = createContext<CountryContextValue | null>(null);

export const CountryProvider: React.FC = ({ children }) => {
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

  const setCountryFn: SetCountry = (countryCode) => {
    router.push(`${ROUTE.COUNTRY}/${countryCode}`);
  };

  const setDateFn: SetDate = (dateValue) => {
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
  const setPrevDayDate: SetPrevDayDate = () => {
    setDateFn(moment(date).subtract(1, "day"));
  };

  const setNextDayDate: SetNextDayDate = () => {
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
