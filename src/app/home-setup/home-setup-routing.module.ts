import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeSetupPage } from './home-setup.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeSetupPageRoutingModule {}
