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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
