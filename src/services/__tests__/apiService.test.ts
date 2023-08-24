import { getStoryFromApi, getLatestStoriesFromApi } from "../../api/hackerNews";
import ApiService from "../apiService";
jest.mock("../../api/hackerNews", () => ({
  getLatestStoriesFromApi: jest.fn(),
  getStoryFromApi: jest.fn(),
}));

const apiService = new ApiService();
describe("ApiService", () => {
  test("ApiService correctly instantiates", () => {
    expect(apiService).toBeInstanceOf(ApiService);
  });

  describe("getLatestStoriesFromApi", () => {
    test("getLatestStoriesFromApi is correctly called with valid data", () => {
      const startPoint = 0;
      const endPoint = 10;
      apiService.getLatestStoriesFromApi(startPoint, endPoint);
      expect(getLatestStoriesFromApi).toHaveBeenCalledWith(
        startPoint,
        endPoint,
      );
      expect(getLatestStoriesFromApi).toHaveBeenCalledTimes(1);
    });
  });

  describe("getStoryFromApi", () => {
    test("getStoryFromApi is correctly called with valid parameters", () => {
      const storyId = 100;
      apiService.getStoryFromApi(storyId);
      expect(getStoryFromApi).toHaveBeenCalledWith(storyId);
      expect(getStoryFromApi).toHaveBeenCalledTimes(1);
    });
  });
});
