import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../auth/types/appState.interface";
import { CreateArticleStateInterface } from "../types/createArticleState.interface";

export const createArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  CreateArticleStateInterface
>("createArticle");

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState) => createArticleState.isSubmitting,
);

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors,
);
