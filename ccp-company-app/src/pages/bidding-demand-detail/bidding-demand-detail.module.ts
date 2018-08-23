import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddingDemandDetailPage} from './bidding-demand-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    BiddingDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddingDemandDetailPage),ComponentsModule,TranslateModule.forChild()
  ],
})
export class BiddingDemandDetailPageModule {}
