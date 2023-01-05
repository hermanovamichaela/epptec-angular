import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly URLUsers = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  resolveUsers(): Observable<any> {
    return this.http.get(this.URLUsers);
  }
}
