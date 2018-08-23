import {DemandContentComponent} from './demand-content/demand-content';
import {IonicModule} from "ionic-angular";
import {NoDataShowComponent} from './no-data-show/no-data-show';
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [DemandContentComponent, NoDataShowComponent,
    ],
    imports: [IonicModule],
    exports: [DemandContentComponent, NoDataShowComponent,
    ],
    entryComponents: [
        DemandContentComponent,NoDataShowComponent
    ],
})
export class ComponentsModule {
}
