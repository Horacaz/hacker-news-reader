import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StoriesFeed from "../StoriesFeed";
import useStories from "@/hooks/useStories";
import { IStory } from "@/types/stories";
import { StoriesFeedProvider } from "@/context/StoriesFeedContext";
jest.mock("@/hooks/useStories");

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
  const user = userEvent.setup();
  test("Component renders a list of stories", () => {
    const stories = generateMockStories(0, 10);
    mockUseStories.mockReturnValue({ loading: false, data: stories });

    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const titles = screen.queryAllByText("Title", { exact: false });
    expect(titles).toHaveLength(stories.length);
  });

  test("Story title must be a link that points to the story's url", () => {
    const stories = generateMockStories(0, 10);
    const firstStory = stories[0];
    mockUseStories.mockReturnValue({ loading: false, data: stories });

    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const storyLink = screen.getAllByRole("link");
    const firstStoryLink = storyLink[0];
    expect(firstStoryLink.getAttribute("href")).toEqual(firstStory.url);
  });

  test("Button open preview should render an iframe with the source of the story", async () => {
    const stories = generateMockStories(0, 1);
    mockUseStories.mockReturnValue({ loading: false, data: stories });
    const firstStory = stories[0];

    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const previewButton = screen.getByRole("button", { name: "Open Preview" });
    expect(previewButton.textContent).toEqual("Open Preview");

    await user.click(previewButton);
    const storyIframe = screen.getByTestId("story-iframe");
    expect(storyIframe.getAttribute("src")).toEqual(firstStory.url);
  });

  test("If loading state is true, it should render a progress bar", () => {
    mockUseStories.mockReturnValue({ loading: true, data: null });
    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    screen.getByRole("progressbar");
  });

  test("Pressing First set startAt to 0", async () => {
    const stories = generateMockStories(0, 1);
    mockUseStories.mockReturnValue({ loading: false, data: stories });
    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const nextButton = screen.getByText("Next");
    await user.click(nextButton);
    screen.getByText("11 - 20 out of 500");
    const firstButton = screen.getByText("First");
    await user.click(firstButton);
    screen.getByText("1 - 10 out of 500");
  });

  test("Pressing Next should add 10 to startAt", async () => {
    const stories = generateMockStories(0, 1);
    mockUseStories.mockReturnValue({ loading: false, data: stories });
    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const nextButton = screen.getByText("Next");
    await user.click(nextButton);
    screen.getByText("11 - 20 out of 500");
  });

  test("Pressing Previous should subtract 10 to startAt if startAt > 0", async () => {
    const stories = generateMockStories(0, 1);
    mockUseStories.mockReturnValue({ loading: false, data: stories });
    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const nextButton = screen.getByText("Next");
    await user.click(nextButton);
    screen.getByText("11 - 20 out of 500");
    const PreviousButton = screen.getByText("Previous");
    await user.click(PreviousButton);
    screen.getByText("1 - 10 out of 500");
  });

  test("Pressing Last should set startAt to 490", async () => {
    const stories = generateMockStories(0, 1);
    mockUseStories.mockReturnValue({ loading: false, data: stories });
    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    const lastButton = screen.getByText("Last");
    await user.click(lastButton);
    screen.getByText("491 - 500 out of 500");
  });

  test("Shows error message if an error has occurred", () => {
    mockUseStories.mockReturnValue({
      loading: false,
      error: { message: "Failed to retrieve stories from server." },
    });
    render(<StoriesFeed />, { wrapper: StoriesFeedProvider });
    screen.getByRole("heading", {
      name: "Error: Failed to retrieve stories from server.",
    });
  });
});
