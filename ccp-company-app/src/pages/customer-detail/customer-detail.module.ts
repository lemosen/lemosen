import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDetailPage } from './customer-detail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CustomerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDetailPage),TranslateModule.forChild(),
  ],
})
export class CustomerDetailPageModule {}
