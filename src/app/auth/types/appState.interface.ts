import { AuthStateInterface } from "./authState.interface";
import { FeedStateInterface } from "../../shared/modules/feed/types/feedState.interface";
import { PopularTagsStateInterface } from "../../shared/modules/popularTags/types/popularTagsState.interface";

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
}
