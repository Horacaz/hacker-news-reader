import { render, screen } from "@testing-library/react";
import PaginatorButton from "../PaginatorButton";

describe("PaginatorButton", () => {
  test("It should render correctly", () => {
    render(
      <PaginatorButton
        text="button test"
        onClick={() => {}}
        isDisabledRef={false}
        colorMode="dark"
      />,
    );
    screen.getByText("button test");
  });
  test("It should be disabled if isDisabledRef is true", () => {
    render(
      <PaginatorButton
        text="test"
        onClick={() => {}}
        isDisabledRef={true}
        colorMode="dark"
      />,
    );
    const button = screen.getByText("test");
    expect(button.hasAttribute("disabled")).toBe(true);
  });
});
