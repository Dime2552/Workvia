import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(private authService: Authentication, private router: Router) {}

  canActivate(): boolean {

    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/employee']); 
    return false;
  }
}
