import { render, screen } from "@testing-library/react";
import { IStory } from "@/types/stories";
import ListOfStories from "../ListOfStories";

const listOfStories: IStory[] = [
  {
    id: 0,
    title: "Title 0",
    url: "https://Foo.com",
    postedBy: "Foo",
  },
];
describe("ListOfStories", () => {
  test("It renders correctly", () => {
    render(
      <ListOfStories listOfStories={listOfStories} showPreview={() => {}} />,
    );
    screen.getByText("Title 0");
    screen.getByText("Open Preview");
  });
});
