import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticleComponent } from "./components/article/article.component";
import { EffectsModule } from "@ngrx/effects";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { ArticleService as sharedArticleService } from "../shared/services/article.service";
import { RouterModule } from "@angular/router";
import { ErrorMessageModule } from "../shared/modules/errorMessage/errorMessage.module";
import { LoadingModule } from "../shared/modules/loading/loading.module";
import { TagListModule } from "../shared/modules/tagList/tagList.module";
import { ArticleService } from "./services/article.service";
import { DeleteArticleEffect } from "./store/effects/deleteArticle.effect";

const routes = [
  {
    path: "articles/:slug",
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature("article", reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule.forChild(routes),
    TagListModule,
  ],
  declarations: [ArticleComponent],
  providers: [sharedArticleService, ArticleService],
})
export class ArticleModule {}
