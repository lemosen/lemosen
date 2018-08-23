import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";

/*
  Generated class for the ArbitrateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArbitrateServiceProvider extends HttpService{

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    super(http, alertCtrl);
  }

}
