import { Component, signal } from '@angular/core';
import { Authentication } from './core/services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Workvia');

  constructor(public authService: Authentication, private router: Router) {}

  OnLogoutClicked(){
    this.authService.getLogout().subscribe({
      next: () => {
        this.authService.currentUserName = null;
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })
  }
}
