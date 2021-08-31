import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10 px;
    }
  `]
})
export class HomeComponent implements OnInit {

  auth!: Auth;

  get showAuthAtHome(): Auth {
    return this.authService.auth;
  }

  constructor( private router: Router,
               private authService: AuthService) { }

  ngOnInit(): void {
    this.auth = this.showAuthAtHome;
  }

  logout(){
    this.authService.borraAuth();
    this.router.navigate(['./auth']);
  }

}
