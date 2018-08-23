import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultiSelectModalPage } from './multi-select-modal';

@NgModule({
  declarations: [
    MultiSelectModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MultiSelectModalPage),
  ],
})
export class MultiSelectModalPageModule {}
