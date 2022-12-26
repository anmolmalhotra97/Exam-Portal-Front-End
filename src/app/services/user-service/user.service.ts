import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '/home/anmolmalhotra97/Desktop/Github/Exam Portal/Exam Portal Angular Frontend/src/app/services/helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //Add User
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
}
