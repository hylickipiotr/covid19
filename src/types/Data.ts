import { Moment } from "moment";

export interface Data {
  confirmed: number;
  deaths: number;
  recoverd: number;
  active: number;
  updatedAt: Moment;
}
