import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { customEmailValidator } from './custom-validators'; // Asegúrate de que la ruta del validador personalizado sea correcta

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email, customEmailValidator()],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatcher }
    );
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      console.error('Formulario no válido');
      return;
    }
    this.http
      .post('http://localhost:8080/api/v1/guardar', this.registerForm.value)
      .subscribe(
        (response) => {
          console.log('Usuario registrado correctamente', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en registro de usuario', error);
        }
      );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  private passwordMatcher(control: FormGroup): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
