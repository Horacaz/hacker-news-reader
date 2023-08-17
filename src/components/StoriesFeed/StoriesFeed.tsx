import { Button, Grid, GridItem, Text, Link, Stack } from "@chakra-ui/react";
import { useState } from "react";
import useStories from "../../hooks/useStories";
import { IStory } from "../../types/stories";
export default function StoriesFeed() {
  const [story, setStory] = useState<IStory | null>(null);
  const stories = useStories();
  return (
    <Grid templateColumns="repeat(2, 1fr)" p={4}>
      <GridItem>
        {stories && (
          <ListedStory onClickCB={setStory} listOfStories={stories} />
        )}
      </GridItem>
      <GridItem>{story && <StoryPreview story={story} />}</GridItem>
    </Grid>
  );
}
function ListedStory(props: {
  listOfStories: IStory[];
  onClickCB: (article: IStory) => void;
}) {
  const callbackFunction = props.onClickCB;
  return props.listOfStories.map((story) => {
    return (
      <Stack key={story.id} direction="column" spacing={-2} padding={2}>
        <Link href={story.url} fontSize={"md"} fontWeight={"bold"} isExternal>
          {story.title}
        </Link>
        <Stack direction={"row"}>
          <Text color={"gray.500"}>Posted by: {story.by}</Text>
          <Button
            colorScheme={"purple"}
            variant={"link"}
            onClick={() => callbackFunction(story)}
          >
            Open Preview
          </Button>
        </Stack>
      </Stack>
    );
  });
}

function StoryPreview(props: { story: IStory }) {
  const story = props.story;
  return (
    <iframe
      width="100%"
      height="100%"
      data-testid="story-iframe"
      title={story.title}
      src={story.url}
    ></iframe>
  );
}
