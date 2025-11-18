import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../../core/services/account';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  isRegisterFormSubmited: boolean = false;

  constructor(private accountService: Account, private router: Router){
    this.registerForm = new FormGroup({
      personName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      isAdmin: new FormControl(false),
    })
  }

  get register_personNameControl(): any {
    return this.registerForm.controls["personName"];
  }

  get register_emailControl(): any {
    return this.registerForm.controls["email"];
  }

  get register_passwordControl(): any {
    return this.registerForm.controls["password"];
  }

  get register_confirmPasswordControl(): any {
    return this.registerForm.controls["confirmPassword"];
  }

  get register_isAdminControl(): any {
    return this.registerForm.controls["isAdmin"];
  }

  registerSubmited() {
    this.isRegisterFormSubmited = true;

    this.accountService.postRegister(this.registerForm.value).subscribe({
      next: (response: User) => {
        console.log(response);

        this.isRegisterFormSubmited = false;

        this.router.navigate(['/register']);

        this.registerForm.reset();
      },

      error: (error) => {
        console.log(error);
      },

      complete: () => {}
    })
  }
}
