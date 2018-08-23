import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";

/*
  Generated class for the ExpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExpServiceProvider extends HttpService{

  constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
    super(http, alertCtrl);
  }


}
