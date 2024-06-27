import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit() {
    this.userService.login(this.user).subscribe(
      (response: any) => {
        this.userService.setToken(response.token);
        console.log('Usuario logged in correctamente', response);
        this.userService.me().subscribe(
          (userData) => {
            this.userService.setCurrentUser(userData);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error fetching user data', error);
            this.errorMessage = 'Error fetching user data';
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.error('Error during login', error);
        this.errorMessage =
          'Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.';
      }
    );
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
