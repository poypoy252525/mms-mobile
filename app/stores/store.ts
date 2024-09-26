import { Death } from "@/constants/Entity";
import { create } from "zustand";

interface Store {
  death: Death | undefined;
  setSelectedDeath: (death: Death) => void;
}

export const useStore = create<Store>((set) => ({
  death: undefined,
  setSelectedDeath: (death: Death) => set(() => ({ death })),
}));
