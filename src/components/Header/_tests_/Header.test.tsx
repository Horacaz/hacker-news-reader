import { render, screen } from "@testing-library/react";
import Header from "../Header";
describe("Header", () => {
  test("Title is rendered correctly", async () => {
    const title = "Uizard Hackernews Quest";
    render(<Header />);

    await screen.findByText(title);
  });
});
