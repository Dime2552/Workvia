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
import { ShiftUpdateModal } from './components/shift-update-modal/shift-update-modal';
import { Dashboard } from './pages/dashboard/dashboard';
import { BaseChartDirective } from 'ng2-charts';


@NgModule({
  declarations: [
    AdminLayout,
    Users,
    UserUpdateModal,
    ShiftCreateModal,
    Schedule,
    ShiftUpdateModal,
    Dashboard
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FullCalendarModule,
    BaseChartDirective
  ]
})
export class AdminModule { }
