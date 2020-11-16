import { Moment } from "moment";

export interface Data {
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  updatedAt: Moment;
}
