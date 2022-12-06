import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccDetailPageRoutingModule } from './acc-detail-routing.module';

import { AccDetailPage } from './acc-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccDetailPageRoutingModule
  ],
  declarations: [AccDetailPage]
})
export class AccDetailPageModule {}
