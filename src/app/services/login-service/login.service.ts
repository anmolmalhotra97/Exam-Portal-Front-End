import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  //This pushes an event to all the subscribers -> here NavbarComponent
  public loginStatusSubject = new Subject<boolean>();

  //Get Current Logged In user
  public getCurrentUser() {
    console.log("Getting Current User from Backend");
    return this.http.get(`${baseUrl}/current-user`);
  }


  // Generate Token from Backend
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //Login User: set token in Local Storage
  public loginUser(authneticationToken: string) {
    console.log("saving token in local storage");
    localStorage.setItem("authenticationToken", authneticationToken);
    return true;
  }

  //isLogin: if user is Logged In or Not
  //Check if token is present in Local Storage i.e. Browser Local Storage
  public isUserLoggedIn() {
    let tokenString = localStorage.getItem("authenticationToken");
    if (tokenString == undefined || tokenString == '' || tokenString == null) {
      return false;
    }
    return true;
  }

  //Logout User: Remove Token from Local Storage
  public logoutUser() {
    localStorage.removeItem("authenticationToken");
    localStorage.removeItem("user");
    return true;
  }

  //Get Token: Get Token from Local Storage
  public getToken() {
    return localStorage.getItem("authenticationToken");
  }

  //Set User: Set User in Local Storage
  //This is done in order to reduce the number of API Calls to Backend
  public setUser(user: any) {
    console.log("Saving User in Local Storage");
    localStorage.setItem("user", JSON.stringify(user));
  }

  //Get User: Get User from Local Storage
  public getUser() {
    let userString = localStorage.getItem("user");
    if (userString != null) {
      return JSON.parse(userString);
    }
    else {
      this.logoutUser();
      return null;
    }
  }

  //Get User Role: Get User Role from Local Storage
  //Considering only 1 role per user at the moment
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
