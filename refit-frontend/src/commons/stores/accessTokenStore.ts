import { create } from "zustand";

type AccessTokenStore = {
  accessToken: string;
  setAccessToken: (token: string) => void;
};

export const useAccessTokenStore = create<AccessTokenStore>((set) => {
  return {
    accessToken: "",
    setAccessToken: (token) => {
      set(() => ({ accessToken: token }));
    },
  };
});
