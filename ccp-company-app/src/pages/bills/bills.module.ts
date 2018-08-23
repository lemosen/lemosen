import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BillsPage} from './bills';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BillsPage,
  ],
  imports: [
    IonicPageModule.forChild(BillsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class BillsPageModule {}
