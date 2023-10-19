import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ArticleInputInterface } from "../../shared/types/articleInput.interface";
import { ArticleInterface } from "../../shared/types/article.interface";
import { environment } from "../../../environments/environment";
import { SaveArticleResponseInterface } from "../../shared/types/saveArticleResponse.interface";

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string | null,
    articleInput: ArticleInputInterface,
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    const articleRequestBody = {
      article: {
        ...articleInput,
      },
    };

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, articleRequestBody)
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
