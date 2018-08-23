import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {PageQuery} from "../../common/PageQuery";
import {Notification} from "../../domain/Notification";

/*
  Generated class for the NotificationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationServiceProvider extends HttpService{

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    super(http, alertCtrl);
  }

  /**
   * 查询系统通知列表 tips:accountName
   * @returns {Promise<any>}
   */
  listNotifications(query: PageQuery): Promise<any> {
    return this.post('/notice/listNotifications.do',query.toJsonString());
  }

  /**
   * 查询系统通知列表 tips:accountName,notificationId
   * @returns {Promise<any>}
   */
  viewNotification(notificationId,accountName):Promise<Notification>{
    const params = new HttpParams().set("notificationId",notificationId).set("accountName",accountName);
    return this.get("/notice/viewNotification.do",params);
  }
}
