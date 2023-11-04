import { IStory } from "@/types/stories";
import { Box, Progress } from "@chakra-ui/react";

type StoryPreviewProps = {
  story: IStory;
  onLoad: () => void;
  isDisplayed: boolean;
};

export default function StoryPreview(props: StoryPreviewProps) {
  return (
    <Preview {...props} /> || (
      <Progress id="progress" colorScheme="purple" size="md" isIndeterminate />
    )
  );
}

function Preview({ isDisplayed, onLoad, story }: StoryPreviewProps) {
  return (
    <Box
      width="100%"
      height="100vh"
      data-testid="iframe-container"
      display={isDisplayed ? "block" : "none"}
    >
      <iframe
        width="100%"
        height="100%"
        id="story-iframe"
        data-testid="story-iframe"
        title={story.title}
        src={story.url}
        onLoad={onLoad}
      ></iframe>
    </Box>
  );
}
