import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AuditDemandsPage} from './audit-demands';
import {TranslateModule} from "@ngx-translate/core";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AuditDemandsPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditDemandsPage),TranslateModule.forChild(),ComponentsModule
  ],
})
export class BiddedDemandsPageModule {}
