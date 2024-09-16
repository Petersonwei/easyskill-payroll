import { create } from "zustand";
import { Currency } from "../api/dictionary";

type CurrenciesState = {
  currencies: Currency[];
  setCurrencies: (currencies: Currency[]) => void;
};

export const useCurrenciesStore = create<CurrenciesState>((set) => ({
  currencies: [],
  setCurrencies: (currencies: Currency[]) => set({ currencies }),
}));

export const useCurrencies = () => useCurrenciesStore((state) => state.currencies);
export const useSetCurrencies = () => useCurrenciesStore((state) => state.setCurrencies);
