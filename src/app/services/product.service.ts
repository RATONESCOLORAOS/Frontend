import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/cart-products';

  constructor(private http: HttpClient, private userService: UserService) {}

  getProductsByCartId(cartId: number): Observable<any[]> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.get<any[]>(`${this.apiUrl}/${cartId}`, config);
  }

  saveProducts(cartId: number, products: any[]): Observable<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.post<any>(
      `${this.apiUrl}/${cartId}/save`,
      products,
      config
    );
  }

  deleteProduct(productId: number): Observable<void> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, config);
  }

  updateProduct(productId: number, updateData: any): Observable<any> {
    const config = {
      headers: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    };
    return this.http.put<any>(
      `${this.apiUrl}/updateProduct/${productId}`,
      updateData,
      config
    );
  }
}
