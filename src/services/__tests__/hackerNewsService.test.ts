import HackerNewsService from "../hackerNewsService";
jest.mock("@/mappers/storyMapper", () => jest.fn());

const apiServiceMock = {
  getLatestStoriesFromApi: jest.fn(),
  getStoryFromApi: jest.fn(),
};

const storageServiceMock = {
  saveStoryToLocalStorage: jest.fn(),
  getStoryFromLocalStorage: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

const hackerNewsService = new HackerNewsService(
  apiServiceMock,
  storageServiceMock,
);
describe("HackerNewsService", () => {
  test("HackerNewsService correctly instantiates", () => {
    expect(hackerNewsService).toBeInstanceOf(HackerNewsService);
  });
});

describe("HackerNewsService.getLatestStories", () => {
  test("getLatestStories, calls getLatestStoriesFromApi", async () => {
    const startAt = 0;
    const endAt = 10;
    await hackerNewsService.getLatestStories(startAt, endAt);
    expect(apiServiceMock.getLatestStoriesFromApi).toHaveBeenCalledTimes(1);
    expect(apiServiceMock.getLatestStoriesFromApi).toHaveBeenCalledWith(
      startAt,
      endAt,
    );
  });
});
describe("HackerNewsService.getStory", () => {
  test("getStory, calls getStoryFromLocalStorage", () => {
    const storyId = 100;
    hackerNewsService.getStory(storyId);
    expect(storageServiceMock.getStoryFromLocalStorage).toHaveBeenCalledTimes(
      1,
    );
    expect(storageServiceMock.getStoryFromLocalStorage).toHaveBeenCalledWith(
      storyId,
    );
  });
  test("getStory, calls getStoryFromApi if storage method throws, then saves retrieved story to local storage", async () => {
    storageServiceMock.getStoryFromLocalStorage.mockImplementationOnce(() => {
      throw new Error();
    });

    const storyId = 100;
    await hackerNewsService.getStory(storyId);

    expect(storageServiceMock.getStoryFromLocalStorage).toHaveBeenCalledTimes(
      1,
    );

    expect(apiServiceMock.getStoryFromApi).toHaveBeenCalledTimes(1);
    expect(apiServiceMock.getStoryFromApi).toHaveBeenCalledWith(storyId);

    expect(storageServiceMock.saveStoryToLocalStorage).toHaveBeenCalledTimes(1);
  });
});
