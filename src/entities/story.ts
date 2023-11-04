import { IStory } from "@/types/stories";

export default class Story implements IStory {
  id: number;
  title: string;
  url: string;
  postedBy: string;

  constructor({ id, title, url, postedBy }: IStory) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.postedBy = postedBy;
  }
}
