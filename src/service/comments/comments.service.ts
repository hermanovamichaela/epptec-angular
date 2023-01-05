import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly URLComments = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) { }

  resolveComments(): Observable<any> {
    return this.http.get(this.URLComments);
  }
}
