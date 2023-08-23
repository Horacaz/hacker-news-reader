import { IUnparsedStory, IStory } from "../types/stories";

export default function storyMapper(story: IUnparsedStory): IStory {
  const id = story.id;
  const title = story.title;
  const url = story.url;
  const postedBy = story.by;

  return {
    id,
    title,
    url,
    postedBy,
  };
}
