import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { ArticleInterface } from "../../../../types/article.interface";

export const addToFavoritesAction = createAction(
  ActionTypes.ADD_TO_FAVORITES,
  props<{ isFavorited: boolean | null; slug: string | null }>(),
);

export const addToFavoritesSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVORITES_SUCCESS,
  props<{ article: ArticleInterface }>(),
);

export const addToFavoritesFailureAction = createAction(
  ActionTypes.ADD_TO_FAVORITES_FAILURE,
);
