import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModal {
  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Are you sure?';
  @Input() btnOkText: string = 'OK';
  @Input() btnCancelText: string = 'Cancel';
  @Input() btnOkClass: string = 'btn-primary';
  @Input() isAlert: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}
}
