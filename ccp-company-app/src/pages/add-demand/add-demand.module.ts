import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddDemandPage} from './add-demand';
import {TranslateModule} from "@ngx-translate/core";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddDemandPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDemandPage),TranslateModule.forChild(),PipesModule
  ],
})
export class AddDemandPageModule {}
