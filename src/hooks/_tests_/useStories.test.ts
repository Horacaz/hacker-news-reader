import { renderHook, waitFor } from "@testing-library/react";
import useStories from "../useStories";

jest.mock("../../api/hackerNews", () => {
  return {
    getLatestStoriesFromApi: jest.fn(() => Promise.resolve([300])),
    getStoryFromApi: jest.fn((storyId) =>
      Promise.resolve({
        id: storyId,
        title: "Title",
        url: "https://Foo.com",
        by: "Foo",
        time: 123,
        score: 1,
        descendants: 1,
        type: "story",
        kids: [1, 2, 3],
      }),
    ),
  };
});
describe("useStories", () => {
  it("Should return an array of Stories", async () => {
    const { result } = renderHook(() => useStories());
    await waitFor(() => {
      expect(result.current).toEqual([
        {
          id: 300,
          title: "Title",
          url: "https://Foo.com",
          by: "Foo",
          time: 123,
          score: 1,
          descendants: 1,
          type: "story",
          kids: [1, 2, 3],
        },
      ]);
    });
  });
});
