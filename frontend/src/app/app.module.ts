import { TokenInterceptor } from './interceptors/token.interceptor';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiModule, BASE_PATH } from 'src/apiservice';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

import localeHuHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localeHuHu);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApiModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("token")
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: "hu-HU" },
    /* API server URL */
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
