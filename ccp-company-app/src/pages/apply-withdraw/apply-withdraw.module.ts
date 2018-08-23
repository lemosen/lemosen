import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ApplyWithdrawPage} from './apply-withdraw';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ApplyWithdrawPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyWithdrawPage),PipesModule,
  ],
})
export class ApplyWithdrawPageModule {}
