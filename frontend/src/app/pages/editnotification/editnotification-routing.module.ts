import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditnotificationPage } from './editnotification.page';

const routes: Routes = [
  {
    path: '',
    component: EditnotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditnotificationPageRoutingModule {}
