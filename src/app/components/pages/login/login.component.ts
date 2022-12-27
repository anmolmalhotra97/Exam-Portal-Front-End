import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private loginService: LoginService
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
            //Redirect -> USER User Dashboard: If User is USER
          });
      }, (error) => {
        console.log("Error!!");
        console.log(error);
      }
    )

  }

}
