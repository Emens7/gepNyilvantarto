import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefuelPage } from './refuel.page';

const routes: Routes = [
  {
    path: '',
    component: RefuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefuelPageRoutingModule {}
