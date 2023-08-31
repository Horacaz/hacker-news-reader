import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StoryPreview from "../StoryPreview";
import { IStory } from "../../../types/stories";

const storyMock: IStory = {
  id: 1,
  title: "Title",
  url: "https://foo.com/",
  postedBy: "Foo",
};
describe("StoryPreview", () => {
  test("It should render correctly", () => {
    render(
      <StoryPreview story={storyMock} isDisplayed={true} onLoad={() => {}} />,
    );
    const iframe = screen.getByTestId("story-iframe");
    expect(iframe).toHaveProperty("src", storyMock.url);
  });

  test("If isDisplayed is false, it should not render", () => {
    render(
      <StoryPreview story={storyMock} isDisplayed={false} onLoad={() => {}} />,
    );
    const iframeContainer = screen.getByTestId("iframe-container");
    expect(iframeContainer).toHaveStyle("display: none");
  });
});
