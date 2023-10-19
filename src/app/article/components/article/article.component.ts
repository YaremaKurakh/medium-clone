import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { combineLatest, map, Observable, Subscription } from "rxjs";
import {
  articleSelector,
  errorSelector,
  isLoadingSelector,
} from "../../store/selectors";
import { currentUserSelector } from "../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { deleteArticleAction } from "../../store/actions/deleteArticle.action";

@Component({
  selector: "mc-article",
  templateUrl: "/article.component.html",
  styleUrls: ["article.component.scss"],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug!: string | null;
  article!: ArticleInterface | null;
  articleSubscription!: Subscription;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues() {
    this.slug = this.route.snapshot.paramMap.get("slug");
    this.isLoading$ = this.store.source!.pipe(select(isLoadingSelector));
    this.error$ = this.store.source!.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      this.store.source!.pipe(select(articleSelector)),
      this.store.source!.pipe(select(currentUserSelector)),
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null,
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        },
      ),
    );
  }

  initializeListeners() {
    this.articleSubscription = this.store
      .source!.pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData() {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle() {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
  }
}
