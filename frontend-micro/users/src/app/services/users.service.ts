import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8001/users'; // URL do backend
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user, this.httpOptions);
  }

  removeUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
