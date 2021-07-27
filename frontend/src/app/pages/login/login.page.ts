import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../../apiservice/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private readonly userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.userService.loginUser({
      email: this.email,
      password: this.password
    }).pipe(first()).subscribe(
      data => {
        console.log(data.token);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/home']);
      }
    );
  }

}
