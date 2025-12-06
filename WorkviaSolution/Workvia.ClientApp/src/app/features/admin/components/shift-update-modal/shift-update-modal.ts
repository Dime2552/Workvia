import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user';
import { UserService } from '../../../../core/services/user';
import { DialogService } from '../../../../core/services/dialog-service';

@Component({
  selector: 'app-shift-update-modal',
  standalone: false,
  templateUrl: './shift-update-modal.html',
  styleUrl: './shift-update-modal.css',
})
export class ShiftUpdateModal {
  @Input() shiftData: any;
  employees: User[] = [];
  editForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private dialogService: DialogService) {
    this.editForm = new FormGroup({
      employeeId: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.userService.getEmployees().subscribe(data => {
      this.employees = data;
      
      if (this.shiftData) {
        this.editForm.patchValue({
          employeeId: this.shiftData.employeeId,
          startTime: this.formatDate(this.shiftData.start),
          endTime: this.formatDate(this.shiftData.end)
        });
      }
    });
  }

  private formatDate(dateInput: any): string {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);
    return localISOTime;
  }

  update() {
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      if (new Date(formData.endTime) <= new Date(formData.startTime)) {
        this.dialogService.alert("Invalid Time", "End time must be after Start time!");
        return;
      }
      this.activeModal.close({ action: 'update', data: formData });
    }
  }

  delete() {
    this.dialogService.confirm("Delete Shift", "Are you sure you want to delete this shift?")
      .then((confirmed) => {
        if (confirmed) {
          this.activeModal.close({ action: 'delete' });
        }
      });
  }
}
