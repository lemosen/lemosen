import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditDemandPage} from './edit-demand';
import {PipesModule} from "../../pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    EditDemandPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDemandPage),PipesModule,TranslateModule.forChild()
  ],
})
export class EditDemandPageModule {}
