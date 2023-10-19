import { Component, OnInit } from "@angular/core";
import { ArticleInputInterface } from "../../../shared/types/articleInput.interface";
import { filter, map, Observable } from "rxjs";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { select, Store } from "@ngrx/store";
import {
  articleSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from "../../store/selectors";
import { updateArticleAction } from "../../store/actions/updateArticle.action";
import { ActivatedRoute } from "@angular/router";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { ArticleInterface } from "../../../shared/types/article.interface";

@Component({
  selector: "mc-edit-article",
  templateUrl: "/editArticle.component.html",
  styleUrls: ["editArticle.component.scss"],
})
export class EditArticleComponent implements OnInit {
  initialValues$!: Observable<ArticleInputInterface>;
  isLoading$!: Observable<boolean | null>;
  isSubmitting$!: Observable<boolean | null>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  slug!: string | null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues() {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.isSubmitting$ = this.store.source!.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.source!.pipe(
      select(validationErrorsSelector),
    );
    this.initialValues$ = this.store.source!.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      }),
    );
  }

  fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({ slug: this.slug, articleInput }));
  }
}
