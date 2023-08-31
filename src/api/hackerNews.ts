import { IUnparsedStory, LatestStories } from "../types/stories";
export async function getLatestStoriesFromApi(
  startAt: number,
  endAt: number,
): Promise<LatestStories> {
  const URL = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"&startAt="${startAt}"&endAt="${endAt}"`;
  try {
    const latestStories = await fetch(URL).then((res) => res.json());
    return latestStories;
  } catch (error) {
    throw new Error(`There was an error fetching the latest stories. ${error}`);
  }
}

export async function getStoryFromApi(
  storyId: number,
): Promise<IUnparsedStory> {
  const URL = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;

  try {
    const story = await fetch(URL).then((res) => res.json());
    return story;
  } catch (error) {
    throw new Error(`There was an error fetching the story. ${error}`);
  }
}
