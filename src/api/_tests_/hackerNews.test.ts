import { getLatestStoriesFromApi, getStoryFromApi } from "../hackerNews";

global.fetch = jest.fn(
  () =>
    new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r({});
      });
      resolve({ json: () => jsonPromise } as Response);
    }),
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getLatestStoriesFromApi", () => {
  test("Succesfully sends request to Api", () => {
    const expectedUrl =
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    getLatestStoriesFromApi();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });
});
describe("getStoryFromApi", () => {
  test("Succesfully sends request to Api", () => {
    const storyId = 100;
    const expectedUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;

    getStoryFromApi(storyId);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });
});
