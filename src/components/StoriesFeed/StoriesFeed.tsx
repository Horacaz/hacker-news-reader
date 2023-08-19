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
  const [frameIsLoading, setFrameLoading] = useState(true);
  const endAt = startAt + 9;
  const { loading, data } = useStories(startAt, endAt);
  function paginationValidation(startAt: number): void {
    setStory(null);
    setFrameLoading(true);
    if (startAt === 0) {
      setPreviousDisabled(true);
    } else {
      setPreviousDisabled(false);
    }
    if (startAt === 490) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }

  function handlePreview(story: IStory): void {
    setFrameLoading(true);
    setStory(story);
  }

  useEffect(() => {
    paginationValidation(startAt);
  }, [startAt]);

  return (
    <>
      {(loading && (
        <Progress colorScheme="purple" size="md" isIndeterminate />
      )) || (
        <Grid templateColumns="repeat(2, 1fr)" p={4}>
          <GridItem>
            {data && (
              <ListedStory showPreview={handlePreview} listOfStories={data} />
            )}
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text color={"gray.500"} fontSize={"lg"}>
                {startAt + 1} - {endAt + 1} out of 500
              </Text>
              <Box>
                <PaginatorButton
                  text="First"
                  isDisabledRef={previousIsDisabled}
                  onClick={() => setStart(0)}
                />
                <PaginatorButton
                  text="Previous"
                  isDisabledRef={previousIsDisabled}
                  onClick={() => setStart(startAt - 10)}
                />
                <PaginatorButton
                  text="Next"
                  isDisabledRef={nextIsDisabled}
                  onClick={() => setStart(startAt + 10)}
                />
                <PaginatorButton
                  text="Last"
                  isDisabledRef={nextIsDisabled}
                  onClick={() => setStart(490)}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            {story && frameIsLoading && (
              <Progress colorScheme="purple" size="md" isIndeterminate />
            )}
            {story && (
              <StoryPreview
                isDisplayed={!frameIsLoading}
                story={story}
                onLoad={() => setFrameLoading(false)}
              />
            )}
          </GridItem>
        </Grid>
      )}
    </>
  );
}
function ListedStory(props: {
  listOfStories: IStory[];
  showPreview: (article: IStory) => void;
}) {
  const showPreview = props.showPreview;
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
            onClick={() => showPreview(story)}
          >
            Open Preview
          </Button>
        </Stack>
      </Stack>
    );
  });
}

function StoryPreview(props: {
  story: IStory;
  onLoad: () => void;
  isDisplayed: boolean;
}) {
  const story = props.story;
  return (
    <Box
      width="100%"
      height="100%"
      display={props.isDisplayed ? "block" : "none"}
    >
      <iframe
        width="100%"
        height="100%"
        data-testid="story-iframe"
        title={story.title}
        src={story.url}
        onLoad={props.onLoad}
      ></iframe>
    </Box>
  );
}

function PaginatorButton(props: {
  text: string;
  onClick: () => void;
  isDisabledRef: boolean;
}) {
  return (
    <Button
      isDisabled={props.isDisabledRef}
      variant="solid"
      m={2}
      colorScheme="purple"
      onClick={() => props.onClick()}
    >
      {props.text}
    </Button>
  );
}
