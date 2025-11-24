import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftRequest } from '../../../../core/models/shift-request';
import { ShiftResponse } from '../../../../core/models/shift-response';
import { ShiftService } from '../../../../core/services/shift';
import { ShiftCreateModal } from '../../components/shift-create-modal/shift-create-modal';

@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  shifts: ShiftResponse[] = [];

  constructor(
    private shiftService: ShiftService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadShifts();
  }

  loadShifts() {
    this.shiftService.getShifts().subscribe(data => {
        this.shifts = data.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    });
  }

  openAddShiftModal() {
    const modalRef = this.modalService.open(ShiftCreateModal);
    
    modalRef.result.then((formData) => {
      if (formData) {
        // Формуємо об'єкт для відправки
        const request: ShiftRequest = {
            employeeId: formData.employeeId,
            startTime: formData.startTime,
            endTime: formData.endTime
        };

        this.shiftService.postShift(request).subscribe({
            next: () => this.loadShifts(),
            error: (err) => console.error(err)
        });
      }
    }, () => {});
  }
}
