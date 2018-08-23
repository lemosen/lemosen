import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BindingAlipayPage} from './binding-alipay';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    BindingAlipayPage,
  ],
  imports: [
    IonicPageModule.forChild(BindingAlipayPage),PipesModule,
  ],
})
export class BindingAlipayPageModule {}
