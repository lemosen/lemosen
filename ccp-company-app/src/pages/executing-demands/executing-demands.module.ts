import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExecutingDemandsPage} from './executing-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ExecutingDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExecutingDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class ExecutingDemandsPageModule {}
