import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AuthenticationPage} from './authentication';
import {PipesModule} from "../../pipes/pipes.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AuthenticationPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationPage),PipesModule,TranslateModule.forChild()
  ],
})
export class AuthenticationPageModule {}
