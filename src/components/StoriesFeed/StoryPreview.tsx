import { IStory } from "../../types/stories";
import { Box } from "@chakra-ui/react";

export default function StoryPreview(props: {
  story: IStory;
  onLoad: () => void;
  isDisplayed: boolean;
}) {
  const story = props.story;
  return (
    <Box
      width="100%"
      height="100vh"
      data-testid="iframe-container"
      display={props.isDisplayed ? "block" : "none"}
    >
      <iframe
        width="100%"
        height="100%"
        id="story-iframe"
        data-testid="story-iframe"
        title={story.title}
        src={story.url}
        onLoad={props.onLoad}
      ></iframe>
    </Box>
  );
}
