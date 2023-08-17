import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("App renders correctly", () => {
    render(<App />);
    const title = "Uizard Hackernews Quest";
    screen.getByText(title);
  });
});
