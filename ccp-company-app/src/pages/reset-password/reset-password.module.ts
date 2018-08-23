import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ResetPasswordPage} from './reset-password';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),PipesModule,
  ],
})
export class ResetPasswordPageModule {}
