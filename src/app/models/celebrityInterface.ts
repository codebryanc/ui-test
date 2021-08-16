import { IVoteMap } from "./voteInterface";

export interface ICelebrityMap {
    id: number;
    category: string;
    description: string;
    lastUpdated: Date;
    name: string;
    picture: string;
    votes: IVoteMap;
  }
  