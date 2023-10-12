import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CurrentUserInterface } from "../../../../types/currentUser.interface";
import { select, Store } from "@ngrx/store";
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from "../../../../../auth/store/selectors";

@Component({
  selector: "mc-topBar",
  templateUrl: "/topBar.component.html",
  styleUrls: ["topBar.component.scss"],
})
export class TopBarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>;
  isAnonymous$!: Observable<boolean>;
  currentUser$!: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.source!.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.source!.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.source!.pipe(select(currentUserSelector));
  }
}
