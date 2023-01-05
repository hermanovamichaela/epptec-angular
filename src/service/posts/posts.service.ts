import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly URLPosts = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  resolvePosts(): Observable<any> {
    return this.http.get(this.URLPosts);
  }

}
