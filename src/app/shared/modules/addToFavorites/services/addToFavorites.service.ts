import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ArticleInterface } from "../../../types/article.interface";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { GetArticleResponseInterface } from "../../../types/getArticleResponse.Interface";

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}
  addToFavorites(slug: string | null): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .post<GetArticleResponseInterface>(url!, {})
      .pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string | null): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .delete<GetArticleResponseInterface>(url!)
      .pipe(map(this.getArticle));
  }

  getUrl(slug: string | null): string | null {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
