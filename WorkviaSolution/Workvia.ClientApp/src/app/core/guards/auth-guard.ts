import { CanActivate, Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private authService: Authentication, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
};
