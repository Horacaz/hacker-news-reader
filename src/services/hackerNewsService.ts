import ApiService from "./apiService";
import StorageService from "./storageService";
import storyMapper from "../mappers/storyMapper";
import { IStory } from "../types/stories";
export default class HackerNewsService {
  api: ApiService;
  storage: StorageService;

  constructor(apiService: ApiService, storageService: StorageService) {
    this.api = apiService;
    this.storage = storageService;
  }
  async getLatestStories(startAt: number, endAt: number): Promise<number[]> {
    return this.api.getLatestStoriesFromApi(startAt, endAt);
  }
  async getStory(storyId: number): Promise<IStory> {
    try {
      const story = this.storage.getStoryFromLocalStorage(storyId);
      return story;
    } catch (e) {
      const story = storyMapper(await this.api.getStoryFromApi(storyId));
      this.storage.saveStoryToLocalStorage(story);
      return story;
    }
  }
}
