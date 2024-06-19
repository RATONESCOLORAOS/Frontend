import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logout() {
    throw new Error('Method not implemented.');
  }
  private currentUser: any = null;

  constructor() {}

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
