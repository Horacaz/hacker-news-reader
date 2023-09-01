import { Stack, Text, Link, Button, Box } from "@chakra-ui/react";
import { IStory } from "@/types/stories";
export default function ListOfStories(props: {
  listOfStories: IStory[];
  showPreview: (article: IStory) => void;
}) {
  const showPreview = props.showPreview;
  return props.listOfStories.map((story) => {
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
  });
}
