import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'editvehicle',
    loadChildren: () => import('./pages/editvehicle/editvehicle.module').then( m => m.EditvehiclePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'editvehicle/:id',
    loadChildren: () => import('./pages/editvehicle/editvehicle.module').then( m => m.EditvehiclePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'refuel/:vehicleId',
    loadChildren: () => import('./pages/refuel/refuel.module').then( m => m.RefuelPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'refuel/:vehicleId/edit',
    loadChildren: () => import('./pages/editrefuel/editrefuel.module').then( m => m.EditrefuelPageModule),
    canActivate: [ AuthGuard ]
  },

  {
    path: 'refuel/:vehicleId/edit/:refuelId',
    loadChildren: () => import('./pages/editrefuel/editrefuel.module').then( m => m.EditrefuelPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'service/:vehicleId',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'service/:vehicleId/edit',
    loadChildren: () => import('./pages/editservice/editservice.module').then( m => m.EditservicePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'service/:vehicleId/edit/:serviceId',
    loadChildren: () => import('./pages/editservice/editservice.module').then( m => m.EditservicePageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notification/:vehicleId',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notification/:vehicleId/edit',
    loadChildren: () => import('./pages/editnotification/editnotification.module').then( m => m.EditnotificationPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'notification/:vehicleId/edit/:notificationId',
    loadChildren: () => import('./pages/editnotification/editnotification.module').then( m => m.EditnotificationPageModule),
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
