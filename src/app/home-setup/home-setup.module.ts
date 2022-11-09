import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeSetupPageRoutingModule } from './home-setup-routing.module';

import { HomeSetupPage } from './home-setup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeSetupPageRoutingModule
  ],
  declarations: [HomeSetupPage]
})
export class HomeSetupPageModule {}
