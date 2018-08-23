import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UnionpayPage} from './unionpay';

@NgModule({
  declarations: [
    UnionpayPage,
  ],
  imports: [
    IonicPageModule.forChild(UnionpayPage),
  ],
})
export class UnionpayPageModule {}
