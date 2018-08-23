import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UpdatePasswordPage} from './update-password';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    UpdatePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePasswordPage),PipesModule,
  ],
})
export class UpdatePasswordPageModule {}
