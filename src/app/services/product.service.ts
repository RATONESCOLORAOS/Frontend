import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/cart-products';

  constructor(private http: HttpClient) {}

  getProductsByCartId(cartId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${cartId}`);
  }

  saveProducts(cartId: number, products: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, products);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }
}
