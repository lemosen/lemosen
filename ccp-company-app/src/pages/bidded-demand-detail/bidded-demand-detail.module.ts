import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddedDemandDetailPage} from './bidded-demand-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    BiddedDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddedDemandDetailPage),ComponentsModule,TranslateModule.forChild()
  ],
})
export class BiddedDemandDetailPageModule {}
