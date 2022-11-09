import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccSetupPage } from './acc-setup.page';

const routes: Routes = [
  {
    path: '',
    component: AccSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccSetupPageRoutingModule {}
