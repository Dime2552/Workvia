import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';
        let errorTitle = 'Error';

        if (error.error) {
          if (typeof error.error === 'string') {
             errorMessage = error.error.split('|')[0]; 
          } 
          else if (error.error.title) {
            errorTitle = error.error.title;
            errorMessage = error.error.detail || error.error.title;
            
            if (error.error.errors) {
                const validationErrors = Object.values(error.error.errors).flat();
                if (validationErrors.length > 0) {
                    errorMessage = validationErrors[0] as string;
                }
            }
          }
        }

        switch (error.status) {
            case 400:
                this.toastr.warning(errorMessage, 'Bad Request');
                break;
            case 401:
                this.toastr.error('Unauthorized. Please login again.', 'Auth Error');
                this.router.navigate(['/login']);
                break;
            case 403:
                this.toastr.error('You do not have permission to perform this action.', 'Forbidden');
                break;
            case 404:
                this.toastr.error('Resource not found.', 'Not Found');
                break;
            case 500:
                this.toastr.error('Server error. Try again later.', 'Server Error');
                break;
            case 0:
                this.toastr.error('Cannot connect to server.', 'Connection Error');
                break;
            default:
                this.toastr.error(errorMessage, errorTitle);
                break;
        }

        return throwError(() => error);
      })
    );
  }
}