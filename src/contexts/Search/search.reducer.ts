import moment from "moment";
import { ActionType, CachedCoutry, Reducer } from "./search.type";
import { validateDate } from "./validateDate";

export const searchReducer: Reducer = (state, action) => {
  const { country, cache } = state;
  switch (action.type) {
    case ActionType.SET_COUNTRY_CODE:
      return {
        ...state,
        countryCode: action.payload,
      };
    case ActionType.SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    case ActionType.SET_DATE:
      const minDate =
        country && cache ? cache[country.iso2].minDate : undefined;
      const now = moment();
      let newDate = validateDate({
        date: action.payload,
        min: minDate,
        max: now,
      });

      return {
        ...state,
        date: newDate,
      };
    case ActionType.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case ActionType.SET_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case ActionType.CACHE_DATA:
      const newCoutryCache: CachedCoutry = {
        ...action.payload,
        updatedAt: moment(),
      };
      return {
        ...state,
        cache: {
          ...cache,
          [action.countryCode]: newCoutryCache,
        },
      };
    case ActionType.SET_FORCE_REFETCH:
      return {
        ...state,
        forceRefetch: action.payload,
      };
  }
};
