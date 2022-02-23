import { catchError, map, Observable, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Post } from '../interface/post';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  private readonly POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

  getPosts(): Observable<User[]> {
    return this.http.get<User[]>(this.POSTS_URL).pipe(
      tap((posts) => console.log(posts)),
      catchError(this.handleError<User[]>('getPosts', []))
    );
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.POSTS_URL + `/?userId=${userId}`).pipe(
      tap((posts) => console.log(posts)),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
}
