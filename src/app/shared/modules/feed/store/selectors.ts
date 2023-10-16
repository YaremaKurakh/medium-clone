import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";
import { AppStateInterface } from "../../../../auth/types/appState.interface";

export const feedFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FeedStateInterface
>("feed");

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState) => feedState.isLoading,
);

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState) => feedState.error,
);

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState) => feedState.data,
);
