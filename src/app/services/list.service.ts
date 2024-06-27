import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient, private userService: UserService) {}

  getUserLists(userId: number): Observable<any[]> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`, config);
  }

  createList(name: string, userId: number): Observable<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.post<any>(
      `${this.apiUrl}/create`,
      {
        cart_name: name,
        user_Id: userId,
      },
      config
    );
  }

  deleteList(cartId: number): Observable<void> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.delete<void>(`${this.apiUrl}/delete/${cartId}`, config);
  }

  updateList(cartId: number, updateRequest: any): Observable<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.put<any>(
      `${this.apiUrl}/update/${cartId}`,
      updateRequest,
      config
    );
  }
}
