import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayout } from './pages/admin-layout/admin-layout';
import { Users } from './pages/users/users';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'users', component: Users },
      //{ path: 'dashboard', component: DashboardComponent },
      //{ path: 'schedule', component: ScheduleComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
