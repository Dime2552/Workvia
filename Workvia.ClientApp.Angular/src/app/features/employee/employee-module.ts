import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing-module';
import { EmployeeLayout } from './pages/employee-layout/employee-layout';
import { EmployeeSchedule } from './pages/employee-schedule/employee-schedule';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    EmployeeLayout,
    EmployeeSchedule
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FullCalendarModule
  ]
})
export class EmployeeModule { }
