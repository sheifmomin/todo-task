import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteTaskPage } from './write-task.page';

const routes: Routes = [
  {
    path: '',
    component: WriteTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteTaskPageRoutingModule {}
