import {
  saveStoryToLocalStorage,
  getStoryFromLocalStorage,
} from "../../storage/storage";
import StorageService from "../storageService";
import { IStory } from "../../types/stories";

jest.mock("../../storage/storage", () => ({
  saveStoryToLocalStorage: jest.fn(),
  getStoryFromLocalStorage: jest.fn(),
}));

const storageService = new StorageService();
describe("StorageService", () => {
  test("StorageService correctly instantiates", () => {
    expect(storageService).toBeInstanceOf(StorageService);
  });

  describe("saveStoryToLocalStorage", () => {
    test("saveStoryToLocalStorage is called with valid data", () => {
      const storyMock: IStory = {
        id: 1,
        title: "Title",
        url: "https://Foo.com",
        postedBy: "Foo",
      };
      storageService.saveStoryToLocalStorage(storyMock);
      expect(saveStoryToLocalStorage).toHaveBeenCalledWith(storyMock);
      expect(saveStoryToLocalStorage).toHaveBeenCalledTimes(1);
    });
  });

  test("getStoryFromLocalStorage", () => {
    const storyId = 100;
    storageService.getStoryFromLocalStorage(storyId);
    expect(getStoryFromLocalStorage).toHaveBeenCalledWith(storyId);
    expect(getStoryFromLocalStorage).toHaveBeenCalledTimes(1);
  });
});
