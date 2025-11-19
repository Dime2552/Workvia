import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-dialog',
  standalone: false,
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.css',
})
export class UserDialog {
  registerForm: FormGroup;
  isRegisterFormSubmited: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
    // Твоя логіка форми 1-в-1
    this.registerForm = new FormGroup({
      personName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      isAdmin: new FormControl(false), // Чекбокс або Dropdown
    });
  }

  // Твої геттери (залишаємо як є)
  get register_personNameControl(): any { return this.registerForm.controls["personName"]; }
  get register_emailControl(): any { return this.registerForm.controls["email"]; }
  get register_passwordControl(): any { return this.registerForm.controls["password"]; }
  get register_confirmPasswordControl(): any { return this.registerForm.controls["confirmPassword"]; }
  get register_isAdminControl(): any { return this.registerForm.controls["isAdmin"]; }

  submit() {
    this.isRegisterFormSubmited = true;

    if (this.registerForm.valid) {

      const formData = this.registerForm.value;
    
      this.activeModal.close(formData);
    }
  }
}
