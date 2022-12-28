import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  user: any = null;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.user = this.loginService.getUser();
  }

  logout() {
    this.loginService.logoutUser();
    this.isUserLoggedIn = false;
    this.user = null;
    window.location.reload();
  }
}
