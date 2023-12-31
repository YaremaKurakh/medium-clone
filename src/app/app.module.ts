import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { topBarModule } from "./shared/modules/topBar/topBar.module";
import { PersistenceService } from "./shared/services/persistence.service";
import { Authinterceptor } from "./shared/services/authinterceptor.service";
import { GlobalFeedModule } from "./globalFeed/globalFeed.module";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { YourFeedModule } from "./yourFeed/yourFeed.module";
import { TagFeedModule } from "./tagFeed/tagFeed.module";
import { ArticleModule } from "./article/article.module";
import { CreateArticleModule } from "./createArticle/createArticle.module";
import { EditArticleModule } from "./editArticle/editArticle.module";
import { SettingsModule } from "./settings/settings.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
    topBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Authinterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
