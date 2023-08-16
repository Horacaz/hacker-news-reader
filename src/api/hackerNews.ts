import { IStory, LatestStories } from "../types/stories";
/* https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"&startAt="0"&endAt="10"
These query parameters are not provided by the Hacker News API, they are exposed by the Firebase API.
The Hacker News API always returns the latest 500 stories, but with Firebase's query parameters we 
can filter the data that we want to recive, reducing the size of the response.
*/
export async function getLatestStoriesFromApi(): Promise<LatestStories> {
  const URL =
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
  const latestStories = await fetch(URL).then((res) => res.json());
  return latestStories;
}

export async function getStoryFromApi(storyId: number): Promise<IStory> {
  const URL = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`;
  const story = await fetch(URL).then((res) => res.json());
  return story;
}
