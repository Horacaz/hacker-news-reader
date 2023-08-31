import { saveStoryToLocalStorage, getStoryFromLocalStorage } from "../storage";
import { IStory } from "../../types/stories";

const setItemMock = jest.fn();
const getItemMock = jest.fn();
const jsonParseMock = jest.fn();

beforeEach(() => {
  Storage.prototype.setItem = setItemMock;
  Storage.prototype.getItem = getItemMock;
  JSON.parse = jsonParseMock;
});

describe("saveStoryToLocalStorage", () => {
  test("saveStoryToLocalStorage is called with valid data", () => {
    const storyMock: IStory = {
      id: 1,
      title: "Title",
      url: "https://Foo.com",
      postedBy: "Foo",
    };
    saveStoryToLocalStorage(storyMock);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      `${storyMock.id}`,
      JSON.stringify(storyMock),
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});

describe("getStoryFromLocalStorage", () => {
  test("getStoryFromLocalStorage is called with valid data", () => {
    const storyId = 100;
    getStoryFromLocalStorage(storyId);
    expect(localStorage.getItem).toHaveBeenCalledWith(`${storyId}`);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  test("getStoryFromLocalStorage throws when a story was not found", () => {
    Storage.prototype.getItem = () => null;
    const storyId = 100;
    expect(() => getStoryFromLocalStorage(storyId)).toThrowError(
      `No story with id ${storyId} was found in local storage`,
    );
  });

  test("getStoryFromLocalStorage throws if provided id is not a number", () => {
    const storyId = undefined as unknown;
    expect(() => getStoryFromLocalStorage(storyId as number)).toThrowError(
      "The id provided must be a number",
    );
  });
});
