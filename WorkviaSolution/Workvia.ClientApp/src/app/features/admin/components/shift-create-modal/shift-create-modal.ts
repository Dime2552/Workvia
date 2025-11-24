import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-shift-create-modal',
  standalone: false,
  templateUrl: './shift-create-modal.html',
  styleUrl: './shift-create-modal.css',
})
export class ShiftCreateModal {
  employees: User[] = [];
  createForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    this.createForm = new FormGroup({
      employeeId: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.userService.getEmployees().subscribe(data => this.employees = data);
  }

  submit() {
    if (this.createForm.valid) {
      const formData = this.createForm.value;

      if (formData.startTime && formData.endTime) {
        const start = new Date(formData.startTime);
        const end = new Date(formData.endTime);

        if (end <= start) {
            alert("End time must be after Start time!"); 
            return;
        }
    }

    this.activeModal.close(formData);
    }
  }
}
