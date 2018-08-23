import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddingDemandsPage} from './bidding-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BiddingDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddingDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class BiddingDemandsPageModule {}
