import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { ArticleService as SharedArticleService } from "../../../shared/services/article.service";
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from "../actions/getArticle.action";

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getArticleFailureAction({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService,
  ) {}
}
