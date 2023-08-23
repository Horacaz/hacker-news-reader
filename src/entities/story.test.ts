import { IStory } from "../types/stories";
import Story from "./story";

const storyMock: IStory = {
  id: 1,
  title: "Title",
  url: "https://Foo.com",
  postedBy: "Foo",
};

describe("story", () => {
  test("Instances a new Story with correct properties", () => {
    const story = new Story(storyMock);
    expect(story).toBeInstanceOf(Story);
    expect(story).toEqual(storyMock);
  });
});
