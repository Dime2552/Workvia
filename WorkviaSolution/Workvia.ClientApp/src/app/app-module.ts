import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';
import { UserDialog } from './features/admin/components/user-dialog/user-dialog';

@NgModule({
  declarations: [
    App,
    Register,
    Login,
    UserDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: jwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
