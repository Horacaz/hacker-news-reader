import { createContext, useReducer } from "react";
import { StoriesState, Action } from "@/types/storiesFeedContext";
const storiesReducer = (state: StoriesState, action: Action): StoriesState => {
  switch (action.type) {
    case "SET_STORY":
      return {
        ...state,
        ...action.payload,
      };
    case "HANDLE_PAGINATION":
      return {
        ...state,
        ...action.payload,
      };
    case "FRAME_LOADING":
      return {
        ...state,
        ...action.payload,
      };
    case "ERROR":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error();
  }
};

const initialState: StoriesState = {
  story: null,
  previousIsDisabled: true,
  nextIsDisabled: false,
  startAt: 0,
  frameIsLoading: false,
  endAt: 10,
};

export const StoriesFeedContext = createContext(initialState);
export const StoriesFeedDispatchContext = createContext(
  {} as React.Dispatch<Action>,
);

export function StoriesFeedProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(storiesReducer, initialState);

  return (
    <StoriesFeedContext.Provider value={state}>
      <StoriesFeedDispatchContext.Provider value={dispatch}>
        {children}
      </StoriesFeedDispatchContext.Provider>
    </StoriesFeedContext.Provider>
  );
}
