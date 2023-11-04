import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Paginator from "../Paginator";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Paginator", () => {
  const stateMock = {
    story: null,
    previousIsDisabled: false,
    nextIsDisabled: false,
    startAt: 0,
    frameIsLoading: false,
    endAt: 0,
  };
  const handlePaginationStateMock = jest.fn();

  test("It should render correctly", () => {
    render(
      <Paginator
        state={stateMock}
        handlePaginationState={handlePaginationStateMock}
      />,
    );
    screen.getByText("First");
    screen.getByText("Previous");
    screen.getByText("Next");
    screen.getByText("Last");
  });

  test("Callback function should be executed on click", async () => {
    const user = userEvent.setup();
    render(
      <Paginator
        state={stateMock}
        handlePaginationState={handlePaginationStateMock}
      />,
    );
    const button = screen.getByText("First");
    await user.click(button);
    expect(handlePaginationStateMock).toHaveBeenCalledTimes(1);
  });
});
