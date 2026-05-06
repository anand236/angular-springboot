import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { LoaderService } from '../services/loader-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  const route = inject(Router);
  const loaderService = inject(LoaderService);
  let modifiedReq = req;

  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  loaderService.showLoader();

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status == 401 || error.status == 403) {
        route.navigate(['/login']);
      }
      throw error;
    }),
    finalize(() => loaderService.hideLoader())
  );
};
