import { Grid, GridItem, Text, Flex, Box, Progress } from "@chakra-ui/react";
import { useEffect } from "react";
import { IStory } from "@/types/stories";
import ListOfStories from "./ListOfStories";
import StoryPreview from "./StoryPreview";
import useStoriesFeed from "@/hooks/useStoriesFeed";
import useStories from "@/hooks/useStories";
import Paginator from "../Paginator";
import ErrorMessage from "../ErrorMessage";
import { StoriesState } from "@/types/storiesFeedContext";

type StoriesFeedContentProps = {
  state: StoriesState;
  data: IStory[];
  handlePreview: (story: IStory) => void;
  handlePaginationState: (startAt: number) => void;
  handleFrameLoadingState: (frameIsLoading: boolean) => void;
};
export default function StoriesFeed() {
  const {
    state,
    handleStoryState,
    handleFrameLoadingState,
    handlePaginationState,
  } = useStoriesFeed();

  const { loading, data, error } = useStories(state.startAt, state.endAt);

  const handlePreview = (selectedStory: IStory): void => {
    handleStoryState(selectedStory);
  };

  useEffect(() => {
    handlePaginationState(state.startAt);
  }, [handlePaginationState, state.startAt]);

  if (loading)
    return <Progress colorScheme="purple" size="md" isIndeterminate />;
  if (data)
    return (
      <StoriesFeedContent
        state={state}
        data={data}
        handlePreview={handlePreview}
        handlePaginationState={handlePaginationState}
        handleFrameLoadingState={handleFrameLoadingState}
      />
    );
  if (error) return <ErrorMessage message={error.message} />;
}

function StoriesFeedContent(props: StoriesFeedContentProps) {
  const {
    data,
    handlePreview,
    handlePaginationState,
    handleFrameLoadingState,
    state,
  } = props;

  return (
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
            {state.startAt + 1} - {state.endAt + 1} out of 500
          </Text>
          <Box>
            <Paginator
              state={state}
              handlePaginationState={handlePaginationState}
            />
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        {state.story && state.frameIsLoading && (
          <Progress
            id="progress"
            colorScheme="purple"
            size="md"
            isIndeterminate
          />
        )}
        {state.story && (
          <StoryPreview
            isDisplayed={!state.frameIsLoading}
            story={state.story}
            onLoad={() => handleFrameLoadingState(!state.frameIsLoading)}
          />
        )}
      </GridItem>
    </Grid>
  );
}
