import {
  Grid,
  GridItem,
  Text,
  Flex,
  Box,
  Progress,
  useColorMode,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import useStories from "@/hooks/useStories";
import { IStory } from "@/types/stories";
import ListOfStories from "./ListOfStories";
import PaginatorButton from "./PaginatorButton";
import StoryPreview from "./StoryPreview";
export default function StoriesFeed() {
  const { colorMode } = useColorMode();
  const [story, setStory] = useState<IStory | null>(null);
  const [previousIsDisabled, setPreviousDisabled] = useState(false);
  const [nextIsDisabled, setNextDisabled] = useState(false);
  const [startAt, setStartAt] = useState(0);
  const [frameIsLoading, setFrameLoading] = useState(true);
  const endAt = startAt + 9;
  const { loading, data } = useStories(startAt, endAt);

  const paginationValidation = (start: number): void => {
    setStory(null);
    setPreviousDisabled(start === 0);
    setNextDisabled(start === 490);
  };

  const handlePreview = (selectedStory: IStory): void => {
    setFrameLoading(true);
    setStory(selectedStory);
  };

  useEffect(() => {
    paginationValidation(startAt);
  }, [startAt]);

  return (
    <>
      {loading ? (
        <Progress colorScheme="purple" size="md" isIndeterminate />
      ) : (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          p={4}
        >
          <GridItem>
            {data && (
              <ListOfStories showPreview={handlePreview} listOfStories={data} />
            )}
            <Flex flexDirection="column" alignItems="center">
              <Text fontSize={{ base: "8px", md: "13px" }} color="gray.500">
                {startAt + 1} - {endAt + 1} out of 500
              </Text>
              <Box>
                <PaginatorButton
                  text="First"
                  isDisabledRef={previousIsDisabled}
                  onClick={() => setStartAt(0)}
                  colorMode={colorMode}
                />
                <PaginatorButton
                  text="Previous"
                  isDisabledRef={previousIsDisabled}
                  onClick={() => setStartAt(startAt - 10)}
                  colorMode={colorMode}
                />
                <PaginatorButton
                  text="Next"
                  isDisabledRef={nextIsDisabled}
                  onClick={() => setStartAt(startAt + 10)}
                  colorMode={colorMode}
                />
                <PaginatorButton
                  text="Last"
                  isDisabledRef={nextIsDisabled}
                  onClick={() => setStartAt(490)}
                  colorMode={colorMode}
                />
              </Box>
            </Flex>
          </GridItem>
          <GridItem>
            {story && frameIsLoading && (
              <Progress
                id="progress"
                colorScheme="purple"
                size="md"
                isIndeterminate
              />
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
