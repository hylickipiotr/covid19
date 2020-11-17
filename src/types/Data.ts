import { Moment } from "moment";

export type ValueType = {
  value: number;
  previousDayValue: number;
  growth: number;
};

export type DailyData = {
  confirmed: ValueType;
  deaths: ValueType;
  recovered: ValueType;
  active: ValueType;
  updatedAt: Moment;
};

export type DailyRawData = {
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  updatedAt: Moment;
};

export type HistoricalRawData = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
};
