export interface IStory {
  postedBy: string;
  id: number;
  title: string;
  url: string;
}

export type LatestStories = number[];

export interface IUnparsedStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
