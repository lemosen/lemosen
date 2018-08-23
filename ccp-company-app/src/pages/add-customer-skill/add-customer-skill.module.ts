import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddCustomerSkillPage} from './add-customer-skill';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AddCustomerSkillPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCustomerSkillPage),PipesModule,
  ],
})
export class AddCustomerSkillPageModule {}
