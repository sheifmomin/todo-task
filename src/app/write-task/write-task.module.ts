import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { WriteTaskPageRoutingModule } from './write-task-routing.module';

import { WriteTaskPage } from './write-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    WriteTaskPageRoutingModule
  ],
  declarations: [WriteTaskPage]
})
export class WriteTaskPageModule {}
