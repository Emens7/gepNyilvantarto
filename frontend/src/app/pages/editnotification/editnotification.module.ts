import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditnotificationPageRoutingModule } from './editnotification-routing.module';

import { EditnotificationPage } from './editnotification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditnotificationPageRoutingModule
  ],
  declarations: [EditnotificationPage]
})
export class EditnotificationPageModule {}
