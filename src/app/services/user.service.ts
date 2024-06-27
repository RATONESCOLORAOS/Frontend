import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private tokenKey = 'authToken';
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(credentials: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', user);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  me(): Observable<any> {
    return this.http.get('http://localhost:8080/api/v1/me');
  }
}
