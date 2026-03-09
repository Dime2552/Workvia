import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'admin', loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule), canActivate: [authGuard, adminGuard]},
  {path: 'employee', loadChildren: () => import('./features/employee/employee-module').then(m => m.EmployeeModule), canActivate: [authGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
