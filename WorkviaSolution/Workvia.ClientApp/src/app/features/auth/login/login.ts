import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../../core/services/account';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  isLoginFormSubmited: boolean = false;

  constructor(private accountService: Account, private router: Router){
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

    this.accountService.postLogin(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        this.isLoginFormSubmited = false;

        this.accountService.currentUserName = response.personName;

        localStorage["token"] = response.token;

        //this.router.navigate(['/home']);

        this.loginForm.reset();
      },

      error: (error) => {
        console.log(error);
      },

      complete: () => {}
    })
  }
}
