import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FinishedDemandDetailPage} from './finished-demand-detail';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    FinishedDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FinishedDemandDetailPage),TranslateModule.forChild(),ComponentsModule,
  ],
})
export class FinishedDemandDetailPageModule {}
