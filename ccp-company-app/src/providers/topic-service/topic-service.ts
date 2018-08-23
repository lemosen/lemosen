import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpService} from "../HttpService";
import {AlertController} from "ionic-angular";
import {PageQuery} from "../../common/PageQuery";
import {Storage} from "@ionic/storage";
import {Reply} from "../../domain/Reply";
import {Topic} from "../../domain/Topic";

/*
 Generated class for the TopicServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class TopicServiceProvider extends HttpService {

    constructor(public http: HttpClient, public alertCtrl: AlertController, public storage: Storage) {
        super(http, alertCtrl);
    }

    /**
     * 查询版块列表 tips:
     * @returns {Promise<any>}
     */
    listBoards(): Promise<any> {
        return this.get('/sns/listBoard.do');
    }

    /**
     * 查询话题列表 tips:boardId
     * @returns {Promise<any>}
     */
    topics(query: PageQuery): Promise<any> {
        return this.post("/sns/topics.do", query.toJsonString());
    }

    /**
     * 查看话题详情 tips:topicId
     */
    viewTopic(topicId): Promise<any> {
        const params = new HttpParams().set("topicId", topicId);
        return this.get("/sns/viewTopic.do", params);
    }

    /**
     * 查询回复列表
     * @param query
     * @returns {Promise<any>}
     */
    listReply(query: PageQuery): Promise<any> {
        return this.post("/sns/listReply.do", query.toJsonString());
    }

    /**
     * 回复帖子
     * @param reply
     * @returns {Promise<any>}
     */
    saveReply(reply:Reply):Promise<any>{
        return this.post("/sns/saveReply.do",reply);
    }

    /**
     * 发帖
     * @param topic
     * @returns {Promise<any>}
     */
    saveTopic(topic:Topic):Promise<any>{
        return this.post("/sns/saveTopic.do",topic);
    }

    /**
     * 点赞
     * @param {number} topicId
     * @returns {Promise<any>}
     */
    updatePraise(topicId,accountName):Promise<any>{
        const params = new HttpParams().set("topicId", topicId).set('accountName',accountName);
        return this.get("/sns/updatePraise.do",params);
    }

}
