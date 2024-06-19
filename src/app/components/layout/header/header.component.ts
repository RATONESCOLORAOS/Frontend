import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router'; // Importación correcta

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  profileLetter: string = '';

  constructor(private userService: UserService, private router: Router) {} // Inyectando Router en el constructor

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.profileLetter = user.name.charAt(0).toUpperCase();
    }
  }

  logout() {
    this.router.navigate(['/login']); // Uso del enrutador para la navegación
  }
}
