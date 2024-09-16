/**
 * @jest-environment jsdom
 */

import { render } from "test-utils";
import NoteModal from "./NoteModal";

let commentList = ["test1", "test2"];
let hasComment = true;

describe("NoteModal", () => {
  it("Modal render correctly", () => {
    const { getByTestId, getByPlaceholderText } = render(
      <NoteModal open={true} hasComment={hasComment} commentList={commentList} />,
    );
    const noteModal = getByTestId("noteModal");
    expect(noteModal).not.toBeNull();

    const commentInput = getByPlaceholderText("Write your comments");
    expect(commentInput.textContent).toEqual(commentList.join("\n"));
  });

  it("Modal render without comment case", () => {
    commentList = [];
    hasComment = false;

    const { getByTestId, getByPlaceholderText } = render(
      <NoteModal open={true} hasComment={hasComment} commentList={commentList} />,
    );
    const noteModal = getByTestId("noteModal");
    expect(noteModal).not.toBeNull();

    const commentInput = getByPlaceholderText("Write your comments");
    expect(commentInput.textContent).toEqual("");
  });
});
