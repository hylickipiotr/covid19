import moment from "moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { COUNTRIES } from "../../constants/countries";
import { getData } from "../../utils/getData";
import { createSearchPath } from "./createSearchPath";
import { getCountryCodeFromPath } from "./getCountryCodeFromPath";
import { getDateFromQuery } from "./getDateFromQuery";
import { searchReducer } from "./search.reducer";
import {
  ActionType,
  CacheData,
  Dispatch,
  ForceRefetch,
  GetCountry,
  Reducer,
  SetCountryCode,
  SetDate,
  SetIsFetching,
  SetPrevDayDate,
  State,
  UseSearch,
} from "./search.type";
import { validateDate } from "./validateDate";

export const SearchStateContext = React.createContext<State | undefined>(
  undefined
);
export const SearchDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const SearchProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = React.useReducer<Reducer>(searchReducer, {
    isFetching: false,
  });

  const getCountry: GetCountry = () => {
    const { countryCode } = state;
    if (!countryCode) return;
    const country = COUNTRIES[countryCode];
    return country;
  };

  const setCountry = () => {
    const { date } = state;
    const country = getCountry();
    dispatch({ type: ActionType.SET_COUNTRY, payload: country });
    if (!country || !date) return;
    router.push(createSearchPath(country, date));
  };

  const getDate = () => {
    const date = getDateFromQuery(router.query);
    return date;
  };

  const setIsFetching: SetIsFetching = (isFetching) =>
    dispatch({ type: ActionType.SET_IS_FETCHING, payload: isFetching });

  const setForceRefetch: ForceRefetch = (forceRefetch) =>
    dispatch({ type: ActionType.SET_FORCE_REFETCH, payload: forceRefetch });

  const cacheData: CacheData = ({ countryCode, data }) => {
    dispatch({ type: ActionType.CACHE_DATA, countryCode, payload: data });
  };

  const updateRangeDate = () => {
    const { country, date, cache } = state;
    if (
      !(
        country &&
        date &&
        cache &&
        cache[country.iso2] &&
        cache[country.iso2].minDate
      )
    ) {
      return;
    }

    const validDate = validateDate({
      date,
      min: cache[country.iso2].minDate,
      max: moment(),
    });
    if (date === validDate) return;
    dispatch({ type: ActionType.SET_DATE, payload: validDate });
  };

  const fetchData = async () => {
    const { country, date, cache } = state;
    if (!country || !date) return;

    setIsFetching(true);

    const data = await getData({
      country,
      date,
      cache,
      cacheData,
    });
    dispatch({ type: ActionType.SET_RESULT, payload: data });

    setIsFetching(false);
    updateRangeDate();
  };

  // On Init
  React.useEffect(() => {
    const countryCode = getCountryCodeFromPath(router.asPath);
    const date = getDate();
    dispatch({ type: ActionType.SET_COUNTRY_CODE, payload: countryCode });
    dispatch({ type: ActionType.SET_DATE, payload: date });
  }, []);

  // On CountryCode Changed
  React.useEffect(() => {
    setCountry();
  }, [state.countryCode]);

  // On Date Changed
  React.useEffect(() => {
    const updateDate = () => {
      const { country, date } = state;
      if (!country || !date) return;
      router.push(createSearchPath(country, date));
    };

    updateDate();
  }, [state.date]);

  // On Path Changed
  React.useEffect(() => {
    fetchData();
  }, [state.country, state.date]);

  // On Force Refetch
  React.useEffect(() => {
    fetchData();
    setForceRefetch(false);
  }, [state.forceRefetch]);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
};

export const useSearchState = () => {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error("useSearchState must be used within SearchProvider");
  }
  return context;
};

export const useSearchDispach = () => {
  const context = React.useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error("useSearchDispach must be used within SearchProvider");
  }
  return context;
};

export const useSearch: UseSearch = () => {
  const state = useSearchState();
  const dispatch = useSearchDispach();

  const setCountryCode: SetCountryCode = (countryCode) => {
    dispatch({ type: ActionType.SET_COUNTRY_CODE, payload: countryCode });
  };

  const setDate: SetDate = (date) => {
    dispatch({ type: ActionType.SET_DATE, payload: date });
  };

  const setPrevDayDate: SetPrevDayDate = () => {
    const { date } = state;
    if (!date) return;
    const prevDayDate = moment(date).subtract(1, "day");
    dispatch({ type: ActionType.SET_DATE, payload: prevDayDate });
  };

  const setNextDayDate: SetPrevDayDate = () => {
    const { date } = state;
    if (!date) return;
    const prevDayDate = moment(date).add(1, "day");
    dispatch({ type: ActionType.SET_DATE, payload: prevDayDate });
  };

  const forceRefetch: ForceRefetch = () => {
    dispatch({ type: ActionType.SET_FORCE_REFETCH, payload: true });
  };

  return [
    state,
    {
      dispatch,
      setCountryCode,
      setDate,
      setPrevDayDate,
      setNextDayDate,
      forceRefetch,
    },
  ];
};
