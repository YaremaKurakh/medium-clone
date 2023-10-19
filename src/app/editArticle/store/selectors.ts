import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../auth/types/appState.interface";
import { EditArticleStateInterface } from "../types/editArticleState.interface";

export const editArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  EditArticleStateInterface
>("editArticle");

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState) => editArticleState.isSubmitting,
);

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState) => editArticleState.isLoading,
);

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationErrors,
);

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article,
);
