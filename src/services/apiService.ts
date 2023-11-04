import { IUnparsedStory } from "@/types/stories";
import { getLatestStoriesFromApi, getStoryFromApi } from "@/api/hackerNews";
export default class ApiService {
  constructor() {}
  async getLatestStoriesFromApi(
    startAt: number,
    endAt: number,
  ): Promise<number[]> {
    return getLatestStoriesFromApi(startAt, endAt);
  }
  async getStoryFromApi(storyId: number): Promise<IUnparsedStory> {
    return getStoryFromApi(storyId);
  }
}
