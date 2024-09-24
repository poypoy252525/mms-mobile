import { User } from "@react-native-google-signin/google-signin";
import { create } from "zustand";

interface UserAuth extends User {
  setUser: (user: User) => void;
}

export const useUserStore = create<UserAuth>((set) => ({
  idToken: null,
  scopes: [],
  serverAuthCode: null,
  user: {
    email: "",
    familyName: null,
    givenName: null,
    id: "",
    name: null,
    photo: null,
  },
  setUser: (user: User) => set(() => ({ ...user })),
}));
