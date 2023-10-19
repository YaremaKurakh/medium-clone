import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditArticleComponent } from "./components/editArticle/editArticle.component";
import { RouterModule } from "@angular/router";
import { ArticleFormModule } from "../shared/modules/articleForm/articleForm.module";
import { EditArticleService } from "./services/editArticle.service";
import { EffectsModule } from "@ngrx/effects";
import { UpdateArticleEffect } from "./store/effects/updateArticle.effect";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { GetArticleEffect } from "./store/effects/getArticle.effect";
import { LoadingModule } from "../shared/modules/loading/loading.module";

const routes = [
  {
    path: "articles/:slug/edit",
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature("editArticle", reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
