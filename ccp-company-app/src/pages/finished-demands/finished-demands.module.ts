import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FinishedDemandsPage} from './finished-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    FinishedDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(FinishedDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class FinishedDemandsPageModule {}
