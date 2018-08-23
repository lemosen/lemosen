import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ForgetPasswordPage} from './forget-password';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),PipesModule,
  ],
})
export class ForgetPasswordPageModule {}
