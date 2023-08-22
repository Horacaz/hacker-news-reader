import { useEffect, useReducer } from "react";
import { IStory } from "../types/stories";
import { getLatestStoriesFromApi, getStoryFromApi } from "../api/hackerNews";

type State = {
  loading: boolean | null;
  error: Error | null;
  data: IStory[] | null;
};

type Action = {
  type: string;
  payload: Error | null | IStory[];
};

const initialState = { loading: null, data: null, error: null };

const latestStoriesReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING":
      return { ...state, loading: true, data: null, error: null };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        data: payload as IStory[],
        error: null,
      };
    case "ERROR":
      return { ...state, loading: false, data: null, error: payload as Error };
    default:
      return state;
  }
};

export default function useStories(startAt: number, endAt: number): State {
  const [state, dispatch] = useReducer(latestStoriesReducer, initialState);
  useEffect(() => {
    const getLatestStories = async () => {
      dispatch({ type: "LOADING", payload: null });
      try {
        const latestArticlesCodes = await getLatestStoriesFromApi(
          startAt,
          endAt,
        );
        const articlesCodes = Object.values(latestArticlesCodes);
        const latestArticles = await Promise.all(
          articlesCodes.map((storyId) => getStoryFromApi(storyId)),
        );
        dispatch({ type: "SUCCESS", payload: latestArticles });
      } catch (error) {
        dispatch({ type: "ERROR", payload: null });
      }
    };
    getLatestStories();
  }, [startAt, endAt]);

  return state;
}
