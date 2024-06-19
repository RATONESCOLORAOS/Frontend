import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  getListById(listId: number) {
    throw new Error('Method not implemented.');
  }
  getProducts(cartId: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient) {}

  getUserLists(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  createList(name: string, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, {
      cart_name: name,
      user_Id: userId,
    });
  }

  deleteList(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${cartId}`);
  }
}
