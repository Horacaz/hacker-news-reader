import { IUnparsedStory, IStory } from "@/types/stories";
import storyMapper from "../storyMapper";

const storyMock: IUnparsedStory = {
  id: 1,
  title: "Title",
  url: "https://Foo.com",
  by: "Foo",
  descendants: 0,
  score: 0,
  time: 0,
  type: "story",
  kids: [],
};

const expectStoryMock: IStory = {
  id: 1,
  title: "Title",
  url: "https://Foo.com",
  postedBy: "Foo",
};

describe("storyMapper", () => {
  test("Maps a story correctly when valid data is provided", () => {
    const mappedStory = storyMapper(storyMock);
    expect(mappedStory).toEqual(expectStoryMock);
  });
});
