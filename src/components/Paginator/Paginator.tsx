import { IStory } from "@/types/stories";
import { Box } from "@chakra-ui/react";
import PaginatorButton from "./PaginatorButton";
import { useColorMode } from "@chakra-ui/react";

type State = {
  story: IStory | null;
  previousIsDisabled: boolean;
  nextIsDisabled: boolean;
  startAt: number;
  frameIsLoading: boolean;
  endAt: number;
};

type PaginatorProps = {
  state: State;
  handlePaginationState: (start: number) => void;
};

export default function Paginator({
  state,
  handlePaginationState,
}: PaginatorProps) {
  const { colorMode } = useColorMode();
  const startOffset = 0;
  const endOffset = 490;

  return (
    <Box>
      <PaginatorButton
        text="First"
        isDisabledRef={state.previousIsDisabled}
        onClick={() => handlePaginationState(startOffset)}
        colorMode={colorMode}
      />
      <PaginatorButton
        text="Previous"
        isDisabledRef={state.previousIsDisabled}
        onClick={() => handlePaginationState(state.startAt - 10)}
        colorMode={colorMode}
      />
      <PaginatorButton
        text="Next"
        isDisabledRef={state.nextIsDisabled}
        onClick={() => handlePaginationState(state.startAt + 10)}
        colorMode={colorMode}
      />
      <PaginatorButton
        text="Last"
        isDisabledRef={state.nextIsDisabled}
        onClick={() => handlePaginationState(endOffset)}
        colorMode={colorMode}
      />
    </Box>
  );
}
