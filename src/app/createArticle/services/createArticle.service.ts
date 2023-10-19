import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ArticleInputInterface } from "../../shared/types/articleInput.interface";
import { ArticleInterface } from "../../shared/types/article.interface";
import { environment } from "../../../environments/environment";
import { SaveArticleResponseInterface } from "../../shared/types/saveArticleResponse.interface";

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleInput: ArticleInputInterface,
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + "/articles/";
    const articleRequestBody = {
      article: {
        ...articleInput,
      },
    };

    return this.http
      .post<SaveArticleResponseInterface>(fullUrl, articleRequestBody)
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
