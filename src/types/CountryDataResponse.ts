interface SpecificData {
  value: number;
  detail: string;
}

export interface CountryDataResponse {
  confirmed: SpecificData;
  recovered: SpecificData;
  deaths: SpecificData;
  lastUpdate: string;
}

export type CountryDailyDataResponse = {
  fips: string;
  admin2: string;
  provinceState: string;
  countryRegion: string;
  lastUpdate: string;
  lat: string;
  long: string;
  confirmed: string;
  deaths: string;
  recovered: string;
  active: string;
  combinedKey: string;
  incidenceRate: string;
  "case-fatalityRatio": string;
};

export type CountriesDailyDataResponse = Array<CountryDailyDataResponse>;
