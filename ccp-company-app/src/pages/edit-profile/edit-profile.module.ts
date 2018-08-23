import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EditProfilePage} from './edit-profile';
import {TranslateModule} from "@ngx-translate/core";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),TranslateModule.forChild(),PipesModule,
  ],
})
export class EditProfilePageModule {}
