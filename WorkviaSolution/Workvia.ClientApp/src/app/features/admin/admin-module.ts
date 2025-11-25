import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminLayout } from './pages/admin-layout/admin-layout';
import { Users } from './pages/users/users';
import { UserUpdateModal } from './components/user-update-modal/user-update-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ShiftCreateModal } from './components/shift-create-modal/shift-create-modal';
import { Schedule } from './pages/schedule/schedule';


@NgModule({
  declarations: [
    AdminLayout,
    Users,
    UserUpdateModal,
    ShiftCreateModal,
    Schedule
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule
  ]
})
export class AdminModule { }
