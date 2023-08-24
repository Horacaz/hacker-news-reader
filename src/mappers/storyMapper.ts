import { IUnparsedStory, IStory } from "../types/stories";
import Story from "../entities/story";

export default function storyMapper(story: IUnparsedStory): IStory {
  const id = story.id;
  const title = story.title;
  const url = story.url;
  const postedBy = story.by;

  return new Story({
    id,
    title,
    url,
    postedBy,
  });
}
