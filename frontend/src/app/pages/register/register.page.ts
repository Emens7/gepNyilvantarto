import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { UserService } from '../../../apiservice/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private readonly userService: UserService,
    public toastController: ToastController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.userService.registerUser({
      email: this.email,
      password: this.password
    }).pipe(first()).subscribe(
      (data) => {
        console.log(data);

        this.toastController.create({
          message: 'A regisztráció sikeres! Jelentkezzen be.',
          duration: 2000,
          color: 'success'
        }).then(t => t.present());

        this.router.navigate(['/login']);

      }
    );
  }

}
