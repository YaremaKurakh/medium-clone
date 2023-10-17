import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getPopularTagsAction } from "../../store/actions/getPopularTags.action";
import { Observable } from "rxjs";
import { PopularTagType } from "../../../../types/popularTag.type";
import {
  errorSelector,
  isLoadingSelector,
  popularTagsSelector,
} from "../../store/selectors";

@Component({
  selector: "mc-popular-tags",
  templateUrl: "/popularTags.component.html",
  styleUrls: ["/popularTags.component.scss"],
})
export class PopularTagsComponent implements OnInit {
  popularTags$!: Observable<PopularTagType[] | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues() {
    this.popularTags$ = this.store.source!.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.source!.pipe(select(isLoadingSelector));
    this.error$ = this.store.source!.pipe(select(errorSelector));
  }

  fetchData() {
    this.store.dispatch(getPopularTagsAction());
  }
}
