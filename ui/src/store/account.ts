"use client";

import type { StateCreator } from "zustand";

type UserType = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

type AccountState = {
  user: UserType | null;
  loading: boolean;
};
type AccountAction = {
  setUser: (user: UserType | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};

// define the initial state
const initialState: AccountState = {
  user: null,
  loading: false,
};

export type AccountSlice = AccountState & AccountAction;

export const createAccountSlice: StateCreator<AccountSlice> = (set) => ({
  ...initialState,
  setUser: (user) => set((state) => ({ ...state, user: user })),
  setLoading: (isLoading) => set((state) => ({ ...state, loading: isLoading })),
  reset: () => set(initialState),
});
