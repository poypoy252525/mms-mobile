import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { create } from "zustand";

interface HookShape {
  setBottomSheetRef: (ref: RefObject<BottomSheet>) => void;
  bottomSheetRef: RefObject<BottomSheet> | undefined;
  deceased: Deceased | undefined;
  setDeceased: (deceased: Deceased) => void;
}

export const useListBottomSheet = create<HookShape>((set) => ({
  bottomSheetRef: undefined,
  deceased: undefined,
  setBottomSheetRef: (bottomSheetRef) =>
    set((state) => ({ ...state, bottomSheetRef })),
  setDeceased: (deceased) => set((state) => ({ ...state, deceased })),
}));
