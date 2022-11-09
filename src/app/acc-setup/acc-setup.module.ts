import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccSetupPageRoutingModule } from './acc-setup-routing.module';

import { AccSetupPage } from './acc-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccSetupPageRoutingModule
  ],
  declarations: [AccSetupPage]
})
export class AccSetupPageModule {}
