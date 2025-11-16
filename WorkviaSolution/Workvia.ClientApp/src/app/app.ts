import { Component, signal } from '@angular/core';
import { Account } from './services/account';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Workvia.ClientApp');

  constructor(public accountService: Account, private router: Router) {}

  OnLogoutClicked(){
    this.accountService.getLogout().subscribe({
      next: () => {
        this.accountService.currentUserName = null;

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })
  }
}
