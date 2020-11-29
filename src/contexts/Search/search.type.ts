import { Moment } from "moment";
import { Country } from "../../types/Country";
import { DailyData, DailyRawData } from "../../types/Data";

export type CachedCoutry = {
  today?: DailyRawData | undefined;
  daily: Record<string, number>;
  historical: Array<DailyRawData>;
  minDate: Moment;
  updatedAt?: Moment;
};
export type CacheType = Record<string, CachedCoutry>;

export enum ActionType {
  SET_COUNTRY_CODE = "SET_COUNTRY_CODE",
  SET_COUNTRY = "SET_COUNTRY",
  SET_DATE = "SET_DATE",
  SET_IS_FETCHING = "SET_IS_FETCHING",
  SET_RESULT = "SET_RESULT",
  CACHE_DATA = "CACHE_DATA",
}
export type Action =
  | { type: ActionType.SET_COUNTRY_CODE; payload: string | undefined }
  | { type: ActionType.SET_COUNTRY; payload: Country | undefined }
  | { type: ActionType.SET_DATE; payload: Moment }
  | { type: ActionType.SET_IS_FETCHING; payload: boolean }
  | { type: ActionType.SET_RESULT; payload: DailyData }
  | {
      type: ActionType.CACHE_DATA;
      countryCode: string;
      payload: Pick<CachedCoutry, "daily" | "historical" | "minDate">;
    };

export type Dispatch = (action: Action) => void;

export type State = {
  countryCode?: string;
  country?: Country;
  date?: Moment;
  result?: DailyData;
  isFetching: boolean;
  cache?: CacheType;
};
export type Reducer = (state: State, action: Action) => State;

export type GetCountry = () => Country | undefined;
export type GetDate = () => Moment;
export type SetDate = (date: Moment) => void;
export type SetPrevDayDate = () => void;
export type SetNextDayDate = () => void;
export type SetCountryCode = (countryCode: string) => void;
export type SetIsFetching = (isFetching: boolean) => void;
export type CacheData = (input: {
  countryCode: string;
  data: CachedCoutry;
}) => void;

export type UseSearch = () => [
  State,
  {
    dispatch: Dispatch;
    setCountryCode: SetCountryCode;
    setDate: SetDate;
    setNextDayDate: SetNextDayDate;
    setPrevDayDate: SetPrevDayDate;
  }
];
