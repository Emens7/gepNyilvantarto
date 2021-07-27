import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditrefuelPage } from './editrefuel.page';

const routes: Routes = [
  {
    path: '',
    component: EditrefuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditrefuelPageRoutingModule {}
