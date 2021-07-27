import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loading = this.loadingController.getTop().then(hasLoading => {
      if (!hasLoading) {
        return this.loadingController.create({
          message: 'Kérjük várjon!'
        }).then(loading => loading.present());
      }
    });

    return from(loading).pipe(
      switchMap(() => {
        return next.handle(request);
      }),
      catchError((err) => {
        this.handleErrorResponse(err.error);
        return throwError(err);
      }),
      finalize(() => {
        this.loadingController.getTop().then(hasLoading => {
          if (hasLoading) {
            this.loadingController.dismiss();
          }
        });
      })
    );

  }

  async handleErrorResponse(err: any) {

    if (err.error) {
      await this.presentErrorAlert(err.error);
    }
    //Validation error(s)
    else if (err.errors) {
      const errorList = err.errors
        .map(e => `<li>${e.msg}</li>`);
      await this.presentErrorAlert(`<ul>${errorList}</ul>`)
    }

  }

  async presentErrorAlert(message: string) {

    const alert = await this.alertController.create({
      header: 'Hiba!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


}
