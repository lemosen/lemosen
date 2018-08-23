import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BiddedDemandsPage} from './bidded-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BiddedDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddedDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class BiddedDemandsPageModule {}
