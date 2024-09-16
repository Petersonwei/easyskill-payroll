import { useSearchFilterStore } from "../store/useSearchFilterStore";

describe("useSearchFilterStore", () => {
  it("setFilters should update filters correctly", () => {
    //testing the update of filters
    useSearchFilterStore.getState().setFilters({
      perimeterDynamic: ["agencies"],
      perimeterAgencies: ["3", "4", "9"],
      resourceTypes: ["2", "8", "11"],
    });

    const filters = useSearchFilterStore.getState().filters;
    expect(filters).toEqual({
      perimeterDynamic: ["agencies"],
      perimeterAgencies: ["3", "4", "9"],
      resourceTypes: ["2", "8", "11"],
    });
  });

  it("setDate should update date correctly", () => {
    useSearchFilterStore.getState().setDate("2025-02");

    const date = useSearchFilterStore.getState().date;
    expect(date).toEqual("2025-02");
  });
});
