import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModal } from '../../features/shared/components/confirmation-modal/confirmation-modal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string, 
    message: string, 
    btnOkText: string = 'Yes', 
    btnCancelText: string = 'No',
    btnOkClass: string = 'btn-danger'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationModal, { size: 'sm', centered: true });
    
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.btnOkClass = btnOkClass;
    modalRef.componentInstance.isAlert = false;

    return modalRef.result.then(
        (result) => result === true,
        () => false
    );
  }

  public alert(title: string, message: string): Promise<void> {
    const modalRef = this.modalService.open(ConfirmationModal, { size: 'sm', centered: true });
    
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = 'OK';
    modalRef.componentInstance.btnOkClass = 'btn-primary';
    modalRef.componentInstance.isAlert = true;

    return modalRef.result.then(() => {}, () => {});
  }
}
