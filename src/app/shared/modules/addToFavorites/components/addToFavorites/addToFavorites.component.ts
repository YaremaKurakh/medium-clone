import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { addToFavoritesAction } from "../../store/actions/addToFavorites.action";

@Component({
  selector: "mc-add-to-favorites",
  templateUrl: "addToFavorites.component.html",
  styleUrls: ["/addToFavorites.component.scss"],
})
export class AddToFavoritesComponent implements OnInit {
  @Input("isFavorited") isFavoritedProps!: boolean | null;
  @Input("favoritesCount") favoritesCountProps!: number | null;
  @Input("articleSlug") articleSlug!: string | null;

  favoritesCount!: number | null;
  isFavorited!: boolean | null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  handleLike() {
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      }),
    );
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount! - 1;
    } else {
      this.favoritesCount = this.favoritesCount! + 1;
    }

    this.isFavorited = !this.isFavorited;
  }
}
