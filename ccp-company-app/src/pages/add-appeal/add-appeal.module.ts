import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddAppealPage} from './add-appeal';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddAppealPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAppealPage),PipesModule,
  ],
})
export class AddAppealPageModule {}
