import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccChoicesPageRoutingModule } from './acc-choices-routing.module';

import { AccChoicesPage } from './acc-choices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccChoicesPageRoutingModule
  ],
  declarations: [AccChoicesPage]
})
export class AccChoicesPageModule {}
