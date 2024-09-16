import dayjs from "dayjs";
import { create } from "zustand";
import { FilterGroupId } from "../constants/filterGroups";

export type FilterOptions = Record<FilterGroupId, string[]>;

export type SearchFilterStates = {
  filters: FilterOptions;
  date: string;
};

type SearchFilterActions = {
  setFilters: (filters: FilterOptions) => void;
  setDate: (date: string) => void;
};

export const useSearchFilterStore = create<SearchFilterStates & SearchFilterActions>((set) => ({
  filters: {
    perimeterDynamic: [],
    perimeterAgencies: [],
    resourceTypes: [],
  },
  date: dayjs().format("YYYY-MM"),
  setDate: (date) => {
    set({ date });
  },
  setFilters: (filters) => {
    set({ filters });
  },
}));

export const useFilters = () => useSearchFilterStore((state) => state.filters);
export const useSetFilters = () => useSearchFilterStore((state) => state.setFilters);
export const useDate = () => useSearchFilterStore((state) => state.date);
export const useSetDate = () => useSearchFilterStore((state) => state.setDate);
