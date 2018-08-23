import {Component, Input} from '@angular/core';
import {AppConfig} from "../../app/AppConfig";
import {Demand} from "../../domain/Demand";
import {DemandState} from "../../domain/enums";

/**
 * Generated class for the DemandContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'demand-content',
    templateUrl: 'demand-content.html'
})
export class DemandContentComponent {

    text: string;
    imgUrl: string = AppConfig.imgUrl;
    @Input()
    demand: Demand;

    constructor() {
        console.log('Hello DemandContentComponent Component');
        this.text = 'Hello World';
    }

    get demandState(): boolean {
        if (this.demand != null) {
            return this.demand.demandState.toString() == DemandState[DemandState.DRAFT]
                || this.demand.demandState.toString() == DemandState[DemandState.PLATFORM_AUDIT]
                || this.demand.demandState.toString() == DemandState[DemandState.BIDDING]
                || this.demand.demandState.toString() == DemandState[DemandState.BIDDED]
                || this.demand.demandState.toString() == DemandState[DemandState.EDIT_CONTRACT];
        } else {
            console.log("wait")
            return true;
        }

    }

}
