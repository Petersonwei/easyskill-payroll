/**
 * @jest-environment jsdom
 */

import { render } from "test-utils";
import Checkbox from "./Checkbox";

describe("checkbox", () => {
  it("testing isSelected state", () => {
    const { getByTestId } = render(<Checkbox isChecked={true} />);
    const icon = getByTestId("checked");

    expect(icon).not.toBeNull();
  });
});
