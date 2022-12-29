import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //right now, we are fetching the user from the local storage using the login service
  //We could also use the user service to fetch the user from the backend
  user: any = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    //This is used to get data from the local storage
    this.user = this.loginService.getUser();

    //This is used to get data from the backend
    // this.loginService.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     console.log("Error fetching user from backend: " + error);
    //   }
    // )
  }
}
