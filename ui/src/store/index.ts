import { createStore, useStore } from "zustand";
import { AccountSlice, createAccountSlice } from "@/store/account";
import React, { createContext, useContext } from "react";

export type StoreInterface = AccountSlice;

export type StorePropsWithChildren = React.PropsWithChildren<StoreInterface>;

export type StoreType = ReturnType<typeof initializeStore>;

export const StoreContext = createContext<StoreType | null>(null);

export const useStoreContext = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(StoreContext);

  if (!store) throw new Error("Store is missing the provider");

  return useStore(store, selector);
};

export const initializeStore = (
  preloadedState: Partial<StoreInterface> = {},
) => {
  return createStore<StoreInterface>((...a) => ({
    ...createAccountSlice(...a),
    ...preloadedState,
  }));
};
