import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-user-update-modal',
  standalone: false,
  templateUrl: './user-update-modal.html',
  styleUrl: './user-update-modal.css',
})
export class UserUpdateModal {
  @Input() user!: User;
  
  updateForm: FormGroup;
  isUpdateFormSubmited: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
    this.updateForm = new FormGroup({
      personName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.updateForm.patchValue({
        personName: this.user.name,
        email: this.user.email
      });
    }
  }

  get update_personNameControl(): any { return this.updateForm.controls["personName"]; }
  get update_emailControl(): any { return this.updateForm.controls["email"]; }

  submit() {
    this.isUpdateFormSubmited = true;
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      this.activeModal.close(formData);
    }
  }
}
