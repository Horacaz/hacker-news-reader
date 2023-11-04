/// refactor to use useStoriesFeed

import { useEffect, useReducer, useMemo } from "react";
import { IStory } from "../types/stories";
import StorageService from "../services/storageService";
import ApiService from "../services/apiService";
import HackerNewsService from "../services/hackerNewsService";

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
  const hackerNewsService = useMemo(
    () => new HackerNewsService(new ApiService(), new StorageService()),
    [],
  );

  const [state, dispatch] = useReducer(latestStoriesReducer, initialState);
  useEffect(() => {
    const getStories = async () => {
      dispatch({ type: "LOADING", payload: null });
      try {
        const latestArticlesCodes = await hackerNewsService.getLatestStories(
          startAt,
          endAt,
        );
        const articlesCodes = Object.values(latestArticlesCodes);
        const latestArticles = await Promise.all(
          articlesCodes.map(
            async (storyId) => await hackerNewsService.getStory(storyId),
          ),
        );
        dispatch({ type: "SUCCESS", payload: latestArticles });
      } catch (error) {
        dispatch({ type: "ERROR", payload: null });
      }
    };
    getStories();
  }, [startAt, endAt, hackerNewsService]);

  return state;
}
