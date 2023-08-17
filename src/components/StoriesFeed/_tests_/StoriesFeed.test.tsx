import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StoriesFeed from "../StoriesFeed";
import useStories from "../../../hooks/useStories";
import { IStory } from "../../../types/stories";
jest.mock("../../../hooks/useStories");
const mockUseStories = useStories as jest.Mock;
describe("StoriesFeed", () => {
  const storiesMock: IStory[] = [
    {
      id: 1,
      title: "Title",
      url: "https://Foo.com",
      by: "Foo",
      time: 123,
      score: 1,
      descendants: 1,
      type: "story",
      kids: [1, 2, 3],
    },
  ];
  mockUseStories.mockReturnValue(storiesMock);
  const story = storiesMock[0];
  test("Component renders a story from a list of stories", () => {
    render(<StoriesFeed />);
    screen.findByText(story.title);
    screen.findByText(`Posted by: ${story.by}`);
  });

  test("Story title must be a link that points to the story's url", () => {
    render(<StoriesFeed />);
    const storyLink = screen.getByRole("link");
    expect(storyLink.getAttribute("href")).toEqual(story.url);
  });

  test("Button open preview should render an iframe with the source of the story", async () => {
    const user = userEvent.setup();
    render(<StoriesFeed />);
    const previewButton = screen.getByRole("button");
    expect(previewButton.textContent).toEqual("Open Preview");
    await user.click(screen.getByRole("button"));
    const storyIframe = screen.getByTestId("story-iframe");
    screen.queryByRole("iframe");
    expect(storyIframe.getAttribute("src")).toEqual(story.url);
  });
});
