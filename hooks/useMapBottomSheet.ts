import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { create } from "zustand";

interface MapBottomSheetStore {
  ref: RefObject<BottomSheet> | undefined;
  setRef: (ref: RefObject<BottomSheet>) => void;
}

export const useMapBottomSheet = create<MapBottomSheetStore>((set) => ({
  ref: undefined,
  setRef: (ref) => set((state) => ({ ...state, ref })),
}));
