import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailVerifyPage } from './mail-verify.page';

const routes: Routes = [
  {
    path: '',
    component: MailVerifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailVerifyPageRoutingModule {}
