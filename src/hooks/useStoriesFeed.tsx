import {
  StoriesFeedDispatchContext,
  StoriesFeedContext,
} from "@/context/StoriesFeedContext";
import { IStory } from "@/types/stories";
import { useContext, useCallback } from "react";
export default function useStoriesFeed() {
  const dispatch = useContext(StoriesFeedDispatchContext);
  const state = useContext(StoriesFeedContext);

  const handleStoryState = useCallback(
    (story: IStory | null) => {
      dispatch({
        type: "SET_STORY",
        payload: {
          story: story,
          frameIsLoading: true,
        },
      });
    },
    [dispatch],
  );

  const handleFrameLoadingState = useCallback(
    (frameIsLoading: boolean) => {
      dispatch({
        type: "FRAME_LOADING",
        payload: {
          frameIsLoading: frameIsLoading,
        },
      });
    },
    [dispatch],
  );

  const handlePaginationState = useCallback(
    (offsetStart: number) => {
      dispatch({
        type: "HANDLE_PAGINATION",
        payload: {
          endAt: offsetStart + 9,
          story: null,
          nextIsDisabled: offsetStart === 490,
          previousIsDisabled: offsetStart === 0,
          startAt: offsetStart,
        },
      });
    },
    [dispatch],
  );

  return {
    state,
    handleStoryState,
    handleFrameLoadingState,
    handlePaginationState,
  };
}
