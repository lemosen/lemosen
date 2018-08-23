import "rxjs/add/operator/toPromise";
import {AlertController} from "ionic-angular";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AppConfig} from "../app/AppConfig";

export class HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController) {
    }

    /**
     * 通用GET请求
     * @param {string} url
     * @param paramMap
     * @returns {Promise<any>}
     */
    protected get(url: string, paramMap: HttpParams = null): Promise<any> {
        const options = {
            params: paramMap,
            withCredentials: true
        };
        return this.http.get(AppConfig.base + url, options).toPromise();
    }

    /**
     * 以json形式post提交
     * @param {string} url
     * @param body
     * @param {boolean} showLoading
     * @returns {Promise<any>}
     */
    protected post(url: string, body: any = null, showLoading?: boolean): Promise<any> {
        const options = {
            withCredentials: true,
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8',
                'loading': showLoading ? "true" : "false"
            }),
        };
        return this.http.post(AppConfig.base + url, body, options).toPromise();
    }

    /**
     * 以表单方式提交
     * @param {string} url
     * @param paramMap
     * @param {boolean} showLoading
     * @returns {Promise<any>}
     */
    protected postForm(url: string, body: any = null, showLoading?: boolean): Promise<any> {
        const options = {
            withCredentials: true,
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'loading': showLoading ? "true" : "false"
            }),
        };
        return this.http.post(AppConfig.base + url, body, options).toPromise();
    }


    protected postBodyAndParams(url: string, body: any = null, paramMap: HttpParams = null, showLoading?: boolean): Promise<any> {
        const options = {
            params: paramMap,
            withCredentials: true,
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8',
                'loading': showLoading ? "true" : "false"
            }),
        };
        return this.http.post(AppConfig.base + url, body, options).toPromise();
    }

    protected put(url: string, body: any = null): Promise<any> {
        const options = {
            withCredentials: true,
        };
        return this.http.put(AppConfig.base + url, body, options).toPromise();
    }

    protected delete(url: string, paramMap: HttpParams = null): Promise<any> {
        const options = {
            params: paramMap,
            withCredentials: true,
        };
        return this.http.delete(AppConfig.base + url, options).toPromise();
    }

    protected patch(url: string, body: any = null): Promise<any> {
        const options = {
            withCredentials: true,
        };
        return this.http.patch(AppConfig.base + url, body, options).toPromise();
    }

    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {HttpParams}
     */
    protected buildHttpParams(paramMap: any): HttpParams {
        let params = new HttpParams();
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            // if (val instanceof Date) {
            //     val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            // }
            params = params.set(key, val);
        }
        return params;
    }


    /**
     * url中如果有双斜杠替换为单斜杠
     * 如:http://88.128.18.144:8080//api//demo.替换后http://88.128.18.144:8080/api/demo
     * @param url
     * @returns {string}
     */
    private static formatUrl(url: any): string {
        if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
            url = AppConfig.host + url;
        }
        let index = url.indexOf('//') + 2;
        return url.substring(0, index) + url.substring(index).replace(/\/\//g, '/');
    }
}