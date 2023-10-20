import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { filter, Observable, Subscription } from "rxjs";
import { currentUserSelector } from "../../../auth/store/selectors";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from "../../store/selectors";
import { updateCurrentUserAction } from "../../../auth/store/actions/updateCurrentUser.action";
import { CurrentUserInputInterface } from "../../../shared/types/currentUserInput.interface";
import { logoutAction } from "../../../auth/store/actions/sync.actions";

@Component({
  selector: "mc-settings",
  templateUrl: "/settings.component.html",
  styleUrls: ["settings.component.scss"],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  currentUser!: CurrentUserInterface;
  currentUserSubscription!: Subscription;

  isSubmitting$!: Observable<boolean | null>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit() {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.source!.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.source!.pipe(
      select(validationErrorsSelector),
    );
  }

  initializeListeners() {
    this.currentUserSubscription = this.store
      .source!.pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: "",
    });
  }

  submit() {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
