import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user';
import { AuthenticationService } from '../../../../core/services/authentication';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user';
import { UserRegisterModal } from '../../components/user-register-modal/user-register-modal';
import { UserUpdateModal } from '../../components/user-update-modal/user-update-modal';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getEmployees().subscribe(data => this.users = data);
  }

  openAddUserModal() {
    const modalRef = this.modalService.open(UserRegisterModal);

    modalRef.result.then((userData) => {
      if (userData) {
        this.registerUser(userData);
      }
    }, () => { });
  }

  openUpdateUserModal(user: User) {
    const modalRef = this.modalService.open(UserUpdateModal);

    modalRef.componentInstance.user = user; 

    modalRef.result.then((formData) => {
      if (formData) {
        const updatedUser: User = {
            id: user.id,
            name: formData.personName,
            email: formData.email
        };
        this.updateUser(updatedUser);
      }
    }, () => { });
  }

  registerUser(userData: any) : void {
    this.authService.postRegister(userData).subscribe({
      next: (response) => {
        this.loadUsers();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  updateUser(user: User) : void {
    this.userService.putUpdate(user.id, user).subscribe({
      next: (response) => {
        this.loadUsers();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteUser(user: User) : void{
    if (confirm(`Delete ${user.name}?`)) {
      this.userService.deleteEmployee(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {}
      })
    }
  }
}
