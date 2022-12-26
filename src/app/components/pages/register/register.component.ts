import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar
  ) { }

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user);
    if (this.user.userName == '' || this.user.userName == null) {
      this.snackbar.open("Username is required!!", 'Okay', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

    //Validate

    //addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        Swal.fire('Success', data.userName + ' is Successfully Registered !!', 'success');
      },
      (error) => {
        //error
        console.log(error);
        this.snackbar.open('something went wrong !!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        })
      }
    )
  }
}
