import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLayout } from './pages/employee-layout/employee-layout';
import { EmployeeSchedule } from './pages/employee-schedule/employee-schedule';

const routes: Routes = [
  {
    path: '',
    component: EmployeeLayout,
    children: [
      { path: 'schedule', component: EmployeeSchedule },
      { path: '', redirectTo: 'schedule', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
