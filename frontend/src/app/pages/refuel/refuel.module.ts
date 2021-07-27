import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefuelPageRoutingModule } from './refuel-routing.module';

import { RefuelPage } from './refuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefuelPageRoutingModule
  ],
  declarations: [RefuelPage]
})
export class RefuelPageModule {}
