import { create } from "zustand";

type SelectedPaylipsState = {
  selectedIds: string[];
  setSelected: (id: string, isSelected: boolean) => void;
  setSelectIds: (ids: string[]) => void;
};

export const useSelectedPaylipsStore = create<SelectedPaylipsState>((set) => ({
  selectedIds: [],
  setSelected: (id, isSelected) =>
    set((state) => {
      if (!isSelected) return { selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id) };
      if (state.selectedIds.includes(id)) return {};
      return { selectedIds: [...state.selectedIds, id] };
    }),
  setSelectIds: (ids) => set({ selectedIds: ids }),
}));

export const useSetPaylipSelect = () => useSelectedPaylipsStore((state) => state.setSelected);
export const useSelectedPaylipIds = () => useSelectedPaylipsStore((state) => state.selectedIds);
export const useSetSelectedPaylipIds = () => useSelectedPaylipsStore((state) => state.setSelectIds);
