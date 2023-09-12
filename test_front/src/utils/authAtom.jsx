import { atom } from "jotai";

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authAtom = atom(initialAuthState);
