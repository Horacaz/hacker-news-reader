import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StoriesFeed from "../StoriesFeed";
import useStories from "../../../hooks/useStories";
import { IStory } from "../../../types/stories";
jest.mock("../../../hooks/useStories");

const mockUseStories = useStories as jest.Mock;
function generateMockStories(startAt: number, endAt: number): IStory[] {
  const stories: IStory[] = [];
  for (let i = startAt; i < endAt; i++) {
    stories.push({
      id: i,
      title: `Title ${i}`,
      url: "https://Foo.com",
      postedBy: "Foo",
    });
  }
  return stories;
}
describe("StoriesFeed", () => {
  test("Component renders a list of stories", () => {
    const stories = generateMockStories(0, 10);
    mockUseStories.mockReturnValue({ loading: false, data: stories });

    render(<StoriesFeed />);
    const titles = screen.queryAllByText("Title", { exact: false });
    expect(titles).toHaveLength(stories.length);
  });

  test("Story title must be a link that points to the story's url", () => {
    const stories = generateMockStories(0, 10);
    const firstStory = stories[0];
    mockUseStories.mockReturnValue({ loading: false, data: stories });

    render(<StoriesFeed />);
    const storyLink = screen.getAllByRole("link");
    const firstStoryLink = storyLink[0];
    expect(firstStoryLink.getAttribute("href")).toEqual(firstStory.url);
  });

  test("Button open preview should render an iframe with the source of the story", async () => {
    const stories = generateMockStories(0, 1);
    mockUseStories.mockReturnValue({ loading: false, data: stories });
    const firstStory = stories[0];

    const user = userEvent.setup();
    render(<StoriesFeed />);
    const previewButton = screen.getByRole("button", { name: "Open Preview" });
    expect(previewButton.textContent).toEqual("Open Preview");

    await user.click(previewButton);
    const storyIframe = screen.getByTestId("story-iframe");
    expect(storyIframe.getAttribute("src")).toEqual(firstStory.url);
  });

  test("If loading state is true, it should render a progress bar", () => {
    mockUseStories.mockReturnValue({ loading: true, data: null });
    render(<StoriesFeed />);
    screen.getByRole("progressbar");
  });
});
