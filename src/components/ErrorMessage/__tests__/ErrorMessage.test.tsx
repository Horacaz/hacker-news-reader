import { screen, render } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  test("It renders correctly", () => {
    render(<ErrorMessage message="Test message" />);
    screen.getByRole("heading", { name: "Error: Test message" });
  });
});
