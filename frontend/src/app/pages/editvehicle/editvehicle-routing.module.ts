import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditvehiclePage } from './editvehicle.page';

const routes: Routes = [
  {
    path: '',
    component: EditvehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditvehiclePageRoutingModule {}
