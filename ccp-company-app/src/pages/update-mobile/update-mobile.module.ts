import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UpdateMobilePage} from './update-mobile';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    UpdateMobilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateMobilePage),PipesModule,
  ],
})
export class UpdateMobilePageModule {}
