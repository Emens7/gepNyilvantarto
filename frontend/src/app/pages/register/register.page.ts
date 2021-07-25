import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../apiservice/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
  }

  register() {
    this.userService.registerUser({
      email: this.email,
      password: this.password
    }).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
