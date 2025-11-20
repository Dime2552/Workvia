import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminLayout } from './pages/admin-layout/admin-layout';
import { Users } from './pages/users/users';


@NgModule({
  declarations: [
    AdminLayout,
    Users
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
