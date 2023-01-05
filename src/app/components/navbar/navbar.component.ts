import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  user: any = null;

  constructor(
    public loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(
      (data: any) => {
        this.isUserLoggedIn = data;
        this.user = this.loginService.getUser();
      }
    );
  }

  logout() {
    this.loginService.logoutUser();
    window.location.reload();
  }

  routeToProfilePage() {
    if (this.user.role === 'admin') {
      this.router.navigate(['/admin-profile']);
    }
    else {
      this.router.navigate(['/user-dashboard/student/profile']);
    }
  }
}
