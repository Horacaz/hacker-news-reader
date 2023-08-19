import { renderHook, waitFor } from "@testing-library/react";
import { IStory } from "../../types/stories";
import useStories from "../useStories";

jest.mock("../../api/hackerNews", () => {
  return {
    getLatestStoriesFromApi: jest.fn(() => Promise.resolve([300, 301])),
    getStoryFromApi: jest.fn((storyId) =>
      Promise.resolve({
        id: storyId,
        title: "Title",
        url: "https://Foo.com",
        by: "Foo",
      }),
    ),
  };
});
describe("useStories", () => {
  const expectedData: IStory[] = [
    {
      id: 300,
      title: "Title",
      url: "https://Foo.com",
      by: "Foo",
    },
    {
      id: 301,
      title: "Title",
      url: "https://Foo.com",
      by: "Foo",
    },
  ];
  it("Should return an array of Stories", async () => {
    const { result } = renderHook(() => useStories(300, 301));
    await waitFor(() => {
      expect(result.current).toEqual({
        data: expectedData,
        loading: false,
        error: null,
      });
    });
  });
});
