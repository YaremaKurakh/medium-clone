import { Component, OnInit } from "@angular/core";
import { ArticleInputInterface } from "../../../shared/types/articleInput.interface";
import { Observable } from "rxjs";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { select, Store } from "@ngrx/store";
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from "../../store/selectors";
import { createArticleAction } from "../../store/actions/createArticle.action";

@Component({
  selector: "mc-create-article",
  templateUrl: "/createArticle.component.html",
  styleUrls: ["createArticle.component.scss"],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };

  isSubmitting$!: Observable<boolean | null>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isSubmitting$ = this.store.source!.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.source!.pipe(
      select(validationErrorsSelector),
    );
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
