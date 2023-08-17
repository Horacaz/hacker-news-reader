import { render, screen } from "@testing-library/react";
import Header from "../Header";
describe("Header", () => {
  test("Title is rendered corretly", async () => {
    const title = "Component Title Test";
    render(<Header title={title} />);

    await screen.findByText(title);
  });
});
