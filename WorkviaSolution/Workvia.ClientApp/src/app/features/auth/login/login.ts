import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../../../core/services/authentication';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  isLoginFormSubmited: boolean = false;

  constructor(private authService: Authentication, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  get login_emailControl(): any {
    return this.loginForm.controls["email"];
  }

  get login_passwordControl(): any {
    return this.loginForm.controls["password"];
  }

  loginSubmited() {
    this.isLoginFormSubmited = true;

    this.authService.postLogin(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        this.isLoginFormSubmited = false;

        this.authService.currentUserName = response.personName;

        localStorage["token"] = response.token;

        /*if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/employee']);
        }*/

        this.loginForm.reset();
      },

      error: (error) => {
        console.log(error);
      },

      complete: () => {}
    })
  }
}
