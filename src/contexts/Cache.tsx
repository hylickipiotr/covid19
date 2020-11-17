import React, { createContext, useContext, useReducer } from "react";

export enum ActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR = "CLEAR",
}

export type CacheItem = any;
export type Action =
  | { type: ActionType.ADD_ITEM; key: string; payload: CacheItem }
  | { type: ActionType.REMOVE_ITEM; key: string }
  | {
      type: ActionType.CLEAR;
    };

export type State = Record<string, CacheItem>;

export type CacheReducer = (state: State, action: Action) => State;

export type CacheValue = {
  data: State;
  dispatch: React.Dispatch<Action>;
  addItem: (key: string, item: CacheItem) => void;
  removeItem: (key: string) => void;
  clearCache: () => void;
  getItem: (key: string) => CacheItem | undefined;
};

const CacheContext = createContext<CacheValue | null>(null);

const cacheReducer: CacheReducer = (state, action) => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      return {
        ...state,
        [action.key]: action.payload,
      };
    case ActionType.REMOVE_ITEM:
      const newState = { ...state };
      delete newState[action.key];
      return newState;
    case ActionType.CLEAR:
      return {};
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export const CacheProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cacheReducer, {});

  const addItem: CacheValue["addItem"] = (key, item) => {
    dispatch({
      type: ActionType.ADD_ITEM,
      key,
      payload: item,
    });
  };

  const removeItem: CacheValue["removeItem"] = (key) => {
    dispatch({ type: ActionType.REMOVE_ITEM, key });
  };

  const clearCache: CacheValue["clearCache"] = () => {
    dispatch({ type: ActionType.CLEAR });
  };

  const getItem: CacheValue["getItem"] = (key) => {
    return state[key];
  };

  return (
    <CacheContext.Provider
      value={{
        data: state,
        dispatch,
        addItem,
        removeItem,
        clearCache,
        getItem,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const AuthConsumer = CacheContext.Consumer;

export const useCache = () => {
  const cache = useContext(CacheContext);

  if (!!!cache) {
    throw new Error(
      "Cache context is undefined, please verify you are calling useCache() as child of a <CacheProvider> component."
    );
  }

  return cache;
};
