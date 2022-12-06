import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccDetailPage } from './acc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AccDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccDetailPageRoutingModule {}
