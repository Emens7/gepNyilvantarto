import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditvehiclePageRoutingModule } from './editvehicle-routing.module';

import { EditvehiclePage } from './editvehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditvehiclePageRoutingModule
  ],
  declarations: [EditvehiclePage]
})
export class EditvehiclePageModule {}
