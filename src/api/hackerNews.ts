import { IStory, LatestStories } from "../types/stories";
export async function getLatestStoriesFromApi(
  startAt: number,
  endAt: number,
): Promise<LatestStories> {
  const URL = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"&startAt="${startAt}"&endAt="${endAt}"`;
  const latestStories = await fetch(URL).then((res) => res.json());
  return latestStories;
}

export async function getStoryFromApi(storyId: number): Promise<IStory> {
  const URL = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
  const story = await fetch(URL).then((res) => res.json());
  return story;
}
