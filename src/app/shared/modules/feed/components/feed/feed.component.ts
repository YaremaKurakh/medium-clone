import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { Observable, Subscription } from "rxjs";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from "../../store/selectors";
import { environment } from "../../../../../../environments/environment";
import { ActivatedRoute, Params, Router } from "@angular/router";
import queryString from "query-string";

@Component({
  selector: "mc-feed",
  templateUrl: "/feed.component.html",
  styleUrls: ["feed.component.scss"],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input("apiUrl") apiUrlProps!: string;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  feed$!: Observable<GetFeedResponseInterface | null>;

  limit: number = environment.limit;
  baseUrl: string = this.router.url.split("?")[0];
  currentPage: number = 1;

  queryParamsSubscription!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues() {
    this.isLoading$ = this.store.source!.pipe(select(isLoadingSelector));
    this.error$ = this.store.source!.pipe(select(errorSelector));
    this.feed$ = this.store.source!.pipe(select(feedSelector));
  }

  initializeListeners() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params["page"] || 1);
        this.fetchFeed();
      },
    );
  }

  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    console.log(parsedUrl);

    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
