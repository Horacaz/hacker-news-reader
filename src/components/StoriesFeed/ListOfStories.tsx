import { Stack, Text, Link, Button, Box } from "@chakra-ui/react";
import { IStory } from "@/types/stories";

type ListOfStoriesProps = {
  listOfStories: IStory[];
  showPreview: (article: IStory) => void;
};

type SingleStoryProps = {
  story: IStory;
  showPreview: (article: IStory) => void;
};

function SingleStory({ story, showPreview }: SingleStoryProps) {
  return (
    <Stack key={story.id} direction="column" spacing={-2} padding={2}>
      <Box>
        <Link
          href={story.url}
          fontSize={{ base: "11px", md: "12px", lg: "15px" }}
          fontWeight={"bold"}
          isExternal
        >
          {story.title}
        </Link>
      </Box>
      <Stack direction={"row"}>
        <Text fontSize={{ base: "8px", md: "13px" }} color={"gray.500"}>
          Posted by: {story.postedBy}
        </Text>
        <Button
          fontSize={{ base: "8px", md: "13px" }}
          colorScheme={"purple"}
          variant={"link"}
          onClick={() => showPreview(story)}
        >
          <Link href="#progress">Open Preview</Link>
        </Button>
      </Stack>
    </Stack>
  );
}

export default function ListOfStories(props: ListOfStoriesProps) {
  const showPreview = props.showPreview;
  const listOfStories = props.listOfStories;

  return listOfStories.map((story) => {
    return (
      <SingleStory key={story.id} story={story} showPreview={showPreview} />
    );
  });
}
