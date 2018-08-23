import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {AlertController, Loading, LoadingController} from "ionic-angular";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = "123";
        let loading: string = req.headers.get("loading");
        let showLoading = (loading != null && loading == "true");
        var loader: Loading;
        if (showLoading) {
            loader = this.loadingCtrl.create({content: "请等待...", duration: 30000});
            loader.present();
        }
        req = req.clone({
            setHeaders: {
                token: token
            }
        });
        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                let resToken = event.headers.get("token");
                //写入本地
            }
            if (showLoading) {
                loader.dismissAll();
            }
            return event;
        }).catch(err => {
            if (showLoading) {
                loader.dismissAll();
            }
            this.handleError(err);
            return Observable.throw(err);
        });
    }

    /**
     * 处理请求失败事件
     * @param err
     */
    private handleError(err: any): void {
        console.log(err);
        let msg = '', status = err.status;
        if (status === 401) {
            msg = '会话已过期，请重新登录';
            //跳往登录页
        } else if (status === 404) {
            msg = '请求失败，未找到请求地址';
        } else if (status === 500) {
            msg = '请求失败，服务器出错，请稍后再试';
        } else if (status === 400) {
            msg = err.error;
        }
        this.alertCtrl.create({
            title: "错误",
            subTitle: msg,
            buttons: [{text: '确定'}]
        }).present();
    }
}