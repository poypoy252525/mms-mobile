import { Death, Directions } from "@/constants/Entity";
import { Notification } from "expo-notifications";
import { create } from "zustand";

interface Store {
  death: Deceased | undefined;
  setSelectedDeath: (death: Deceased | undefined) => void;
  directions: Directions | undefined;
  setDirections: (directions: Directions | undefined) => void;
  currentLocation: { latitude: number; longitude: number } | undefined;
  setCurrentLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  cameraCoordinate: number[];
  setCameraCoordinate: (coordinates: number[]) => void;
  destination: number[] | undefined;
  setDestination: (destionation: number[] | undefined) => void;
  notification: Notification | undefined;
  setNotification: (notification: Notification | undefined) => void;
  reset: () => void;
}

export const useStore = create<Store>((set) => ({
  death: undefined,
  setSelectedDeath: (death) => set((state) => ({ ...state, death })),
  directions: undefined,
  setDirections: (directions: Directions | undefined) =>
    set((state) => ({ ...state, directions })),
  currentLocation: undefined,
  setCurrentLocation: (currentLocation) =>
    set((state) => ({ ...state, currentLocation })),
  cameraCoordinate: [121.1464, 14.75410639],
  setCameraCoordinate: (cameraCoordinate: number[]) =>
    set((state) => ({ ...state, cameraCoordinate })),
  destination: undefined,
  setDestination: (destination: number[] | undefined) =>
    set((state) => ({ ...state, destination })),
  notification: undefined,
  setNotification: (notification: Notification | undefined) =>
    set((state) => ({ ...state, notification })),
  reset: () => set(() => ({})),
}));
