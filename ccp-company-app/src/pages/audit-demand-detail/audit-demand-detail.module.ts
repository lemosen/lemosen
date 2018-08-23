import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AuditDemandDetailPage} from './audit-demand-detail';
import {ComponentsModule} from "../../components/components.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AuditDemandDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AuditDemandDetailPage),ComponentsModule,TranslateModule.forChild()
  ],
})
export class AuditDemandDetailPageModule {}
