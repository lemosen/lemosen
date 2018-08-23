import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddEvaluatePage} from './add-evaluate';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddEvaluatePage,
  ],
  imports: [
    IonicPageModule.forChild(AddEvaluatePage),PipesModule,
  ],
})
export class AddEvaluatePageModule {}
