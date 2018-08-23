import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExecutingDemandDetailPage} from './executing-demand-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ExecutingDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExecutingDemandDetailPage),ComponentsModule,TranslateModule.forChild()
  ],
})
export class ExecutingDemandDetailPageModule {}
