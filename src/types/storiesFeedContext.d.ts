import { IStory } from "./stories";

export type StoriesState = {
  story: IStory | null;
  previousIsDisabled: boolean;
  nextIsDisabled: boolean;
  startAt: number;
  frameIsLoading: boolean;
  endAt: number;
};

type SET_STORY_Action = {
  type: "SET_STORY";
  payload: {
    story: IStory | null;
    frameIsLoading: boolean;
  };
};

type HANDLE_PAGINATION_Action = {
  type: "HANDLE_PAGINATION";
  payload: {
    story: null;
    startAt: number;
    endAt: number;
    previousIsDisabled: boolean;
    nextIsDisabled: boolean;
  };
};

type ERROR_Action = {
  type: "ERROR";
  payload: Error | null;
};

type FRAME_LOADING_Action = {
  type: "FRAME_LOADING";
  payload: {
    frameIsLoading: boolean;
  };
};

export type Action =
  | SET_STORY_Action
  | HANDLE_PAGINATION_Action
  | ERROR_Action
  | FRAME_LOADING_Action;
