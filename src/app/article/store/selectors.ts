import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.interface";
import { AppStateInterface } from "../../auth/types/appState.interface";

export const articleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  ArticleStateInterface
>("article");

export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (articleState) => articleState.isLoading,
);

export const errorSelector = createSelector(
  articleFeatureSelector,
  (articleState) => articleState.error,
);

export const articleSelector = createSelector(
  articleFeatureSelector,
  (articleState) => articleState.data,
);
