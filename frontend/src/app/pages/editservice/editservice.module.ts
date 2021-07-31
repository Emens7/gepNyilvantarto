import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditservicePageRoutingModule } from './editservice-routing.module';

import { EditservicePage } from './editservice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditservicePageRoutingModule
  ],
  declarations: [EditservicePage]
})
export class EditservicePageModule {}
