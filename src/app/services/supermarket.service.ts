import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SupermarketService {
  private apiUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient, private userService: UserService) {}

  getTotalPriceForCart(cartId: number): Observable<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.get<any>(`${this.apiUrl}/totalPrice/${cartId}`, config);
  }
}
