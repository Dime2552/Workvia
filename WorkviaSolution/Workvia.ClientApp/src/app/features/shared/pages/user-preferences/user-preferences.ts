import { Component } from '@angular/core';
import { PasswordChangeModal } from '../../components/password-change-modal/password-change-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-user-preferences',
  standalone: false,
  templateUrl: './user-preferences.html',
  styleUrl: './user-preferences.css',
})
export class UserPreferences {

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  openChangePasswordModal() {
    const modalRef = this.modalService.open(PasswordChangeModal);

    modalRef.result.then((passwordData) => {
      if (passwordData) {
        this.updatePassword(passwordData);
      }
    }, () => { });
  }

  updatePassword(passwordData: any) : void {
      this.userService.updatePassword(passwordData).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
}
