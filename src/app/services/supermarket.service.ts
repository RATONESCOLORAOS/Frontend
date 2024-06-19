import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupermarketService {
  private apiUrl = 'http://localhost:8080/api/carts';

  constructor(private http: HttpClient) {}

  getTotalPriceForCart(cartId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalPrice/${cartId}`);
  }
}
