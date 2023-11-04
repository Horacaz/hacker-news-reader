import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("Callback function should be executed on click", async () => {
    const user = userEvent.setup();
    const callBackMock = jest.fn();
    render(
      <PaginatorButton
        text="test"
        onClick={() => callBackMock("foo")}
        isDisabledRef={false}
        colorMode="dark"
      />,
    );
    const button = screen.getByText("test");
    await user.click(button);
    expect(callBackMock).toHaveBeenCalledTimes(1);
    expect(callBackMock).toHaveBeenCalledWith("foo");
  });
});
