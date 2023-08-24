import { IStory } from "../types/stories";
import {
  saveStoryToLocalStorage,
  getStoryFromLocalStorage,
} from "../storage/storage";
export default class StorageService {
  constructor() {}
  saveStoryToLocalStorage(story: IStory) {
    saveStoryToLocalStorage(story);
  }
  getStoryFromLocalStorage(id: number) {
    return getStoryFromLocalStorage(id);
  }
}
