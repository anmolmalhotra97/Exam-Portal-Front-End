import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private matSnackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  loginFormSubmit() {
    console.log("Login Button Clicked");
    /* 
      * Validation in Typescript to check if Username or Password is Empty.
      * MatSnackBar is used to alert the user.
    */
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.matSnackBar.open('Username is Required!!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.username == null) {
      this.matSnackBar.open('Password is Required!!', '', {
        duration: 3000,
      });
      return;
    }

    /*
    * Send Request to Backend Server to Login, Save the Token and User Details in Local Storage
    */
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Generating Token: " + data.authenticationToken);
        //Login User
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (userData: any) => {
            this.loginService.setUser(userData);
            //Redirect -> ADMIN Dashboard: If User is ADMIN
            if (this.loginService.getUserRole() == "ADMIN") {
              this.router.navigate(['/admin']);
              //This pushes an event to all the subscribers -> here NavbarComponent
              this.loginService.loginStatusSubject.next(true);
            }
            //Redirect -> USER User Dashboard: If User is USER
            else if (this.loginService.getUserRole() == "NORMAL") {
              this.router.navigate(['/user-dashboard']);
              //This pushes an event to all the subscribers -> here NavbarComponent
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logoutUser();
            }
          });
      }, (error) => {
        console.log("Error!!");
        console.log(error);
        this.matSnackBar.open('Invalid Details ' + error.error.message, '', {
          duration: 3000,
        });
      }
    );
  }
}
