import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-change-modal',
  standalone: false,
  templateUrl: './password-change-modal.html',
  styleUrl: './password-change-modal.css',
})
export class PasswordChangeModal {
  updatePasswordForm: FormGroup;
  isUpdateFormSubmited: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
    this.updatePasswordForm = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      confirmNewPassword: new FormControl(null, [Validators.required])
    });
  }

  get update_currentPasswordControl(): any {
    return this.updatePasswordForm.controls["currentPassword"];
  }

  get update_newPasswordControl(): any {
    return this.updatePasswordForm.controls["newPassword"];
  } 

  get update_confirmNewPasswordControl(): any {
    return this.updatePasswordForm.controls["confirmNewPassword"];
  }
  
  submit() {
    this.isUpdateFormSubmited = true;
    if (this.updatePasswordForm.valid) {
      const formData = this.updatePasswordForm.value;
      this.activeModal.close(formData);
    }
  }

}
