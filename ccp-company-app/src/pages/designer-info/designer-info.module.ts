import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {DesignerInfoPage} from './designer-info';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DesignerInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DesignerInfoPage),TranslateModule.forChild(),
  ],
})
export class DesignerInfoPageModule {}
