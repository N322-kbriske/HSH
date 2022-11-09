import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessoryRoomPage } from './accessory-room.page';

const routes: Routes = [
  {
    path: '',
    component: AccessoryRoomPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessoryRoomPageRoutingModule {}
