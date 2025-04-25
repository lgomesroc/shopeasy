import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:8003/orders';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order, this.httpOptions);
  }

  removeOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
