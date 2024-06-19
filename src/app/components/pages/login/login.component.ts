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
    this.http
      .post('http://localhost:8080/api/v1/login', this.user, {
        responseType: 'json', // Ожидаем JSON ответ
      })
      .subscribe(
        (response: any) => {
          console.log('Usuario logged in correctamente', response);
          this.userService.setCurrentUser(response);
          this.router.navigate(['/dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.error('Pasa algo!!!', error);
          this.errorMessage =
            'Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.';
        }
      );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
