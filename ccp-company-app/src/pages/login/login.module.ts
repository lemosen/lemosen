import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LoginPage} from './login';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),PipesModule
  ],
})
export class LoginPageModule {}
