import { IStory } from "../types/stories";

export function saveStoryToLocalStorage(story: IStory): void {
  localStorage.setItem(`${story.id}`, JSON.stringify(story));
}

export function getStoryFromLocalStorage(id: number): IStory {
  if (typeof id !== "number")
    throw new Error(`The id provided must be a number`);

  const storyId = id.toString();
  const story = localStorage.getItem(storyId);
  if (story === null)
    throw new Error(`No story with id ${storyId} was found in local storage`);
  return JSON.parse(story);
}
