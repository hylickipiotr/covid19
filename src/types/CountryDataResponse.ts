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
