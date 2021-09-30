import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10 px;
      }
    `,
  ],
})
export class HomeComponent {
  get usuario() {
    return this.authService.usuario;
  }

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
