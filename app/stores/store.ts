import { Death, Directions } from "@/constants/Entity";
import { create } from "zustand";

interface Store {
  death: Death | undefined;
  setSelectedDeath: (death: Death) => void;
  directions: Directions | undefined;
  setDirections: (directions: Directions | undefined) => void;
  currentLocation: { latitude: number; longitude: number } | undefined;
  setCurrentLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
}

export const useStore = create<Store>((set) => ({
  death: undefined,
  setSelectedDeath: (death: Death) => set((state) => ({ ...state, death })),
  directions: undefined,
  setDirections: (directions: Directions | undefined) =>
    set((state) => ({ ...state, directions })),
  currentLocation: undefined,
  setCurrentLocation: (currentLocation) =>
    set((state) => ({ ...state, currentLocation })),
}));
