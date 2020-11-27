import { Moment } from "moment";
import { DailyRawData } from "../types/Data";

export enum ActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR = "CLEAR",
}

export type CacheItem = {
  today?: DailyRawData | undefined;
  daily?: Record<string, number> | undefined;
  historical?: Array<DailyRawData> | undefined;
  minDate?: Moment;
};

export type Action =
  | { type: ActionType.ADD_ITEM; key: string; payload: CacheItem }
  | { type: ActionType.REMOVE_ITEM; key: string }
  | {
      type: ActionType.CLEAR;
    };

export type State = {
  updatedAt?: Moment;
  daily?: Record<string, CacheItem>;
};

export type CacheReducer = (state: State, action: Action) => State;

export type AddItem = (key: string, item: CacheItem) => void;
export type RemoveItem = (key: string) => void;
export type ClearCache = () => void;
export type GetItem = (key: string | undefined) => CacheItem | undefined;

export type CacheValue = {
  daily?: State["daily"];
  updatedAt?: State["updatedAt"];
  addItem: AddItem;
  removeItem: RemoveItem;
  clearCache: ClearCache;
  getItem: GetItem;
};
