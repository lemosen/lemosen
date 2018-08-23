import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CustomerWalletPage} from './customer-wallet';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CustomerWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerWalletPage),TranslateModule.forChild(),
  ],
})
export class CustomerWalletPageModule {}
