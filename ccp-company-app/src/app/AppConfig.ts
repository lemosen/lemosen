/**
 * Created by aidy on 2017/5/8.
 */

export class AppConfig {

    // static baseURL: string = "http://192.168.1.157:8088/web/rest";
    // static imgURL: string = "http://192.168.1.157:8088/web/";
    static baseURL: string = "http://218.16.121.13:8501/web/rest";
    static imgURL: string = "http://218.16.121.13:8501/web/";
    // static baseURL: string = "http://192.168.1.123:8080/web/rest";
    // static imgURL: string = "http://192.168.1.123:8080/web/";
    static imgDomain: string = "/upload/face/";
    private static _openFireURL: string = "http://122.115.40.28:7070/http-bind";
    private static _openFireServiceName: string = "@ccp";
    private static _openFireChatRoomServiceName: string = "@conference.ccp";


    static get base() {
        return this.baseURL;
    }

    static get imgUrl() {
        return this.imgURL;
    }

    static get host() {
        return this.baseURL;
    }

    static get imgFace() {
        return this.imgUrl + this.imgDomain;
    }

    static get openFireServiceName(): string {
        return this._openFireServiceName;
    }

    static get openFireURL(): string {
        return this._openFireURL;
    }

    static get openFireChatRoomServiceName(): string {
        return this._openFireChatRoomServiceName;
    }

    static set openFireChatRoomServiceName(value: string) {
        this._openFireChatRoomServiceName = value;
    }
}
