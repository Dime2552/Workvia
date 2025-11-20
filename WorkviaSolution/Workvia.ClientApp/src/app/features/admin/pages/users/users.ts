import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user';
import { AuthenticationService } from '../../../../core/services/authentication';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../core/models/user';
import { UserRegisterModal } from '../../components/user-dialog/user-register-modal';

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

  registerUser(userData: any) {
    this.authService.postRegister(userData).subscribe({
      next: (res) => {
        alert('Користувача успішно створено!');
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        alert('Помилка реєстрації');
      }
    });
  }
}
