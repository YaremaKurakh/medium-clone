import { SettingsStateInterface } from "./types/settingsState.interface";
import { Action, createReducer, on } from "@ngrx/store";
import {
  updateCurrentUserAction,
  updateCurrentUserSuccessAction,
} from "../../auth/store/actions/updateCurrentUser.action";
import { updateArticleFailureAction } from "../../editArticle/store/actions/updateArticle.action";

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsReducer = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),

  on(
    updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),

  on(
    updateArticleFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
);

export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action);
}
