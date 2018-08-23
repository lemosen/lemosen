import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CustomerSkillPage} from './customer-skill';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CustomerSkillPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerSkillPage),ComponentsModule
  ],
})
export class CustomerSkillPageModule {}
