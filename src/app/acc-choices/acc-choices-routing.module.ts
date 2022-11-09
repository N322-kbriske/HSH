import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccChoicesPage } from './acc-choices.page';

const routes: Routes = [
  {
    path: '',
    component: AccChoicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccChoicesPageRoutingModule {}
