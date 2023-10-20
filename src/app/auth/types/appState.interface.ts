import { AuthStateInterface } from "./authState.interface";
import { FeedStateInterface } from "../../shared/modules/feed/types/feedState.interface";
import { PopularTagsStateInterface } from "../../shared/modules/popularTags/types/popularTagsState.interface";
import { ArticleStateInterface } from "../../article/types/articleState.interface";
import { CreateArticleStateInterface } from "../../createArticle/types/createArticleState.interface";
import { EditArticleStateInterface } from "../../editArticle/types/editArticleState.interface";
import { SettingsStateInterface } from "../../settings/store/types/settingsState.interface";

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
}
