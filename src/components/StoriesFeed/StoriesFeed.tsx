import {
  Button,
  Grid,
  GridItem,
  Text,
  Link,
  Stack,
  Flex,
  Box,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useStories from "../../hooks/useStories";
import { IStory } from "../../types/stories";
export default function StoriesFeed() {
  const [story, setStory] = useState<IStory | null>(null);
  const [previousIsDisabled, setPreviousDisabled] = useState(false);
  const [nextIsDisabled, setNextDisabled] = useState(false);
  const [startAt, setStart] = useState(0);
  const endAt = startAt + 9;
  const { loading, data } = useStories(startAt, endAt);
  useEffect(() => {
    if (startAt === 0) {
      setPreviousDisabled(true);
    } else {
      setPreviousDisabled(false);
    }
    if (endAt >= 500) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [startAt, endAt]);

  return (
    <>
      {(loading && (
        <Progress colorScheme="purple" size="md" isIndeterminate />
      )) || (
        <Grid templateColumns="repeat(2, 1fr)" p={4}>
          <GridItem>
            {data && <ListedStory onClickCB={setStory} listOfStories={data} />}
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text color={"gray.500"} fontSize={"lg"}>
                {startAt + 1} - {endAt + 1} out of 500
              </Text>
              <Box>
                <Button
                  isDisabled={previousIsDisabled}
                  variant="solid"
                  m={2}
                  colorScheme="purple"
                  onClick={() => setStart(startAt - 10)}
                >
                  Previous
                </Button>
                <Button
                  isDisabled={nextIsDisabled}
                  variant="solid"
                  m={2}
                  colorScheme="purple"
                  onClick={() => setStart(startAt + 10)}
                >
                  Next
                </Button>
              </Box>
            </Flex>
          </GridItem>
          <GridItem>{story && <StoryPreview story={story} />}</GridItem>
        </Grid>
      )}
    </>
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
        <Box>
          <Link href={story.url} fontSize={"md"} fontWeight={"bold"} isExternal>
            {story.title}
          </Link>
        </Box>
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
