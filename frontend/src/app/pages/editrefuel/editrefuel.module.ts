import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditrefuelPageRoutingModule } from './editrefuel-routing.module';

import { EditrefuelPage } from './editrefuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditrefuelPageRoutingModule
  ],
  declarations: [EditrefuelPage]
})
export class EditrefuelPageModule {}
