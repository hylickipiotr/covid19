import { Moment } from "moment";
import { Country } from "../types/Country";
import { DailyData } from "../types/Data";

export type TCountry = Country | null;
export type TDate = Moment;
export type TData = DailyData | null;

export type SetCountry = (countryCode: string) => void;
export type SetDate = (date: TDate) => void;
export type SetCountryData = React.Dispatch<React.SetStateAction<TData>>;
export type SetPrevDayDate = () => void;
export type SetNextDayDate = () => void;

export interface CountryContextValue {
  country: TCountry;
  date: TDate;
  countryData: TData;
  fetching: boolean;

  setCountry: SetCountry;
  setDate: SetDate;
  setCountryData: SetCountryData;
  setPrevDayDate: SetPrevDayDate;
  setNextDayDate: SetNextDayDate;
}
