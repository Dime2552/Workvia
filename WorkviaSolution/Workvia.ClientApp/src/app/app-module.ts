import { NgModule, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Login } from './features/auth/login/login';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';
import { UserRegisterModal } from './features/admin/components/user-register-modal/user-register-modal';
import { UserPreferences } from './features/shared/pages/user-preferences/user-preferences';
import { PasswordChangeModal } from './features/shared/components/password-change-modal/password-change-modal';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ConfirmationModal } from './features/shared/components/confirmation-modal/confirmation-modal';
import { ErrorInterceptor } from './core/interceptors/error-interceptor-interceptor';

registerLocaleData(localeUk);

@NgModule({
  declarations: [
    App,
    Login,
    UserRegisterModal,
    UserPreferences,
    PasswordChangeModal,
    ConfirmationModal
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: jwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'uk-UA' },
    provideCharts(withDefaultRegisterables())
  ],
  bootstrap: [App]
})
export class AppModule { }
