import { useSelectedPaylipsStore } from "../store/useSelectedPaylipsStore";

describe("useSelectedPaylipsStore", () => {
  it("selectedIds should update correctly when single checked", () => {
    // testing single checked updating of selectedIds
    useSelectedPaylipsStore.getState().setSelected("4", true);
    let selectedIds = useSelectedPaylipsStore.getState().selectedIds;
    expect(selectedIds).toEqual(["4"]);

    // testing duplicate checked updating of selectedIds
    useSelectedPaylipsStore.getState().setSelected("4", true);
    selectedIds = useSelectedPaylipsStore.getState().selectedIds;
    expect(selectedIds).toEqual(["4"]);

    // testing unchecked updating of selectedIds
    useSelectedPaylipsStore.getState().setSelected("4", false);
    selectedIds = useSelectedPaylipsStore.getState().selectedIds;
    expect(selectedIds).toEqual([]);
  });

  it("selectedIds should update correctly when multiple checked", () => {
    // testing multiple checked updating of selectedIds
    useSelectedPaylipsStore.getState().setSelectIds(["1", "2", "3", "5"]);
    let selectedIds = useSelectedPaylipsStore.getState().selectedIds;
    expect(selectedIds).toEqual(["1", "2", "3", "5"]);

    useSelectedPaylipsStore.getState().setSelectIds(["1", "4", "6", "7"]);
    selectedIds = useSelectedPaylipsStore.getState().selectedIds;
    expect(selectedIds).toEqual(["1", "4", "6", "7"]);

    useSelectedPaylipsStore.getState().setSelectIds([]);
    selectedIds = useSelectedPaylipsStore.getState().selectedIds;
    expect(selectedIds).toEqual([]);
  });
});
