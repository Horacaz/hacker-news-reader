import { getLatestStoriesFromApi, getStoryFromApi } from "../hackerNews";

beforeEach(() => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r({});
        });
        resolve({ json: () => jsonPromise } as Response);
      }),
  );
});

describe("getLatestStoriesFromApi", () => {
  const startAt = 100;
  const endAt = 200;
  const expectedUrl = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"&startAt="${startAt}"&endAt="${endAt}"`;

  test("Succesfully sends request to Api", () => {
    getLatestStoriesFromApi(startAt, endAt);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  test("Should throw error if request fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));
    await expect(getLatestStoriesFromApi(startAt, endAt)).rejects.toThrow(
      "There was an error fetching the latest stories. Error: API Error",
    );
  });
});
describe("getStoryFromApi", () => {
  const storyId = 100;
  const expectedUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;

  test("Succesfully sends request to Api", () => {
    getStoryFromApi(storyId);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  test("Should throw error if request fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));
    await expect(getStoryFromApi(storyId)).rejects.toThrow(
      "There was an error fetching the story. Error: API Error",
    );
  });
});
