import { Component, signal } from '@angular/core';
import { AuthenticationService } from './core/services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Workvia');

  constructor(public authService: AuthenticationService, private router: Router) {}

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
