import moment from "moment";
import React, { createContext, useContext, useReducer } from "react";
import {
  ActionType,
  AddItem,
  CacheReducer,
  CacheValue,
  ClearCache,
  GetItem,
  RemoveItem,
} from "./cache.type";

const CacheContext = createContext<CacheValue | null>(null);

const cacheReducer: CacheReducer = (state, action) => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      return {
        updatedAt: moment(),
        daily: {
          ...state.daily,
          [action.key]: action.payload,
        },
      };
    case ActionType.REMOVE_ITEM:
      const newDaily = { ...state.daily };
      delete newDaily[action.key];
      return {
        ...state,
        daily: newDaily,
      };
    case ActionType.CLEAR:
      return {
        updatedAt: moment(),
        daily: {},
      };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

export const CacheProvider: React.FC = ({ children }) => {
  const [{ daily, updatedAt }, dispatch] = useReducer(cacheReducer, {});

  const addItem: AddItem = (key, item) => {
    dispatch({
      type: ActionType.ADD_ITEM,
      key,
      payload: item,
    });
  };

  const removeItem: RemoveItem = (key) => {
    dispatch({ type: ActionType.REMOVE_ITEM, key });
  };

  const clearCache: ClearCache = () => {
    dispatch({ type: ActionType.CLEAR });
  };

  const getItem: GetItem = (key) => {
    return key && daily ? daily[key] : undefined;
  };

  return (
    <CacheContext.Provider
      value={{
        daily,
        updatedAt,
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
