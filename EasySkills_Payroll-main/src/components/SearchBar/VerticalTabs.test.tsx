/**
 * @jest-environment jsdom
 */

import { render } from "test-utils";
import VerticalTabs from "./VerticalTabs";

let value = 2;
let perimeterCheckedNum = 5;
let typeCheckedNum = 1;

describe("VerticalTabs", () => {
  it("testing tabs component's attributes", () => {
    const { getByRole, getAllByRole } = render(
      <VerticalTabs value={value} perimeterCheckedNum={perimeterCheckedNum} typeCheckedNum={typeCheckedNum} />,
    );

    // testing attributes of selected tab
    const selectedTab = getByRole("tab", { selected: true });
    expect(selectedTab.getAttribute("id")).toEqual("vertical-tab-2");
    expect(selectedTab.getAttribute("aria-controls")).toEqual("vertical-tabpanel-2");

    // testing attributes of unselected tabs
    const unSelectedTabs = getAllByRole("tab", { selected: false });
    const [perimeterTab, typeTab] = unSelectedTabs;
    expect(perimeterTab.getAttribute("id")).toEqual("vertical-tab-0");
    expect(perimeterTab.getAttribute("aria-controls")).toEqual("vertical-tabpanel-0");
    expect(perimeterTab.textContent).toEqual("Perimeter");

    expect(typeTab.getAttribute("id")).toEqual("vertical-tab-1");
    expect(typeTab.getAttribute("aria-controls")).toEqual("vertical-tabpanel-1");
    expect(typeTab.textContent).toEqual("Type");

    // testing tab symbol
    const tabSymbols = getAllByRole("tabSymbolContainer");
    expect(tabSymbols.length).toEqual(2);

    // testing tab symbol's inner number
    const tabSymbolInnerNumbers = getAllByRole("tabSymbol").map((tabSymbol) => tabSymbol.innerHTML);

    expect(tabSymbolInnerNumbers[0]).toEqual(perimeterCheckedNum.toString());
    expect(tabSymbolInnerNumbers[1]).toEqual(typeCheckedNum.toString());
  });

  it("testing tabs component's tab change", () => {
    value = 0;
    perimeterCheckedNum = 0;
    typeCheckedNum = 1;

    const { getByRole, getAllByRole } = render(
      <VerticalTabs value={value} perimeterCheckedNum={perimeterCheckedNum} typeCheckedNum={typeCheckedNum} />,
    );

    // testing attributes of selected tab
    const selectedTab = getByRole("tab", { selected: true });
    expect(selectedTab.getAttribute("id")).toEqual("vertical-tab-0");
    expect(selectedTab.getAttribute("aria-controls")).toEqual("vertical-tabpanel-0");

    // testing tab symbol
    let tabSymbols = getAllByRole("tabSymbolContainer");
    expect(tabSymbols.length).not.toEqual(2);

    // testing tab symbol's inner number
    const tabSymbolInnerNumbers = getAllByRole("tabSymbol").map((tabSymbol) => tabSymbol.innerHTML);
    expect(tabSymbolInnerNumbers[0]).toEqual(typeCheckedNum.toString());

    // testing tab symbol in null case
    typeCheckedNum = 0;
    tabSymbols = getAllByRole("tabSymbolContainer");
    expect(tabSymbols).toBeNull;
  });
});
