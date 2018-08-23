import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {Article} from "../../domain/Article";
import {PageQuery} from "../../common/PageQuery";

/*
 Generated class for the ArticleChannelServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ArticleChannelServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    /**
     * 查询栏目列表
     *
     * @return
     */

    listArticleChannels(): Promise<any> {
        return this.get("/articleChannel/listArticleChannels.do");
    }

    /**
     * 查询频道列表
     *
     * @param channelId
     * @return
     */
    listProgramas(channelId): Promise<any> {
        const params = new HttpParams().set("channelId", channelId);
        return this.get("/articleChannel/listProgramas.do", params);
    }

    /**
     * 查询文章列表
     *
     * @param programaId
     * @return
     */
    listArticles(query:PageQuery): Promise<any> {
        return this.post("/articleChannel/listArticles.do", query.toJsonString());
    }

    /**
     * 获取指定code的articleChannel
     */
    getArticleChannelByCode(channelCode:string):Promise<any>{
        const params = new HttpParams().set("channelCode",channelCode);
        return this.get("/articleChannel/getArticleChannelByCode.do",params)
    }

    /**
     * 查看文章
     *
     * @param articleId
     * @return
     */
    viewArticle(articleId): Promise<Article> {
        const params = new HttpParams().set("articleId", articleId);
        return this.get("/articleChannel/viewArticle.do", params);
    }


}
