import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessoryRoomPageRoutingModule } from './accessory-room-routing.module';

import { AccessoryRoomPage } from './accessory-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessoryRoomPageRoutingModule
  ],
  declarations: [AccessoryRoomPage]
})
export class AccessoryRoomPageModule {}
