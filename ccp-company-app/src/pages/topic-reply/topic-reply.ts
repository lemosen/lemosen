import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TopicServiceProvider} from "../../providers/topic-service/topic-service";
import {Topic} from "../../domain/Topic";
import {AppConfig} from "../../app/AppConfig";
import {PageQuery} from "../../common/PageQuery";
import {Reply} from "../../domain/Reply";
import {Author} from "../../domain/Author";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the TopicReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-topic-reply',
    templateUrl: 'topic-reply.html',
})
export class TopicReplyPage {
    topic: Topic;
    imgUrl: string = AppConfig.imgFace;
    query: PageQuery = new PageQuery;
    replys: Reply[] = [];
    comment:string='';

    constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams, private topicServiceProvider: TopicServiceProvider) {
        this.query.pushParamsRequests('topicId', this.navParams.get('topicId'));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TopicReplyPage');
    }

    ngOnInit(): void {
        this.topicServiceProvider.viewTopic(this.navParams.get('topicId')).then(data => {
            this.topic = data;

        })
        this.refreshReply();
    }

    refreshReply() {
        this.query.resetRequests();
        this.topicServiceProvider.listReply(this.query).then(data => {
            this.replys = data.content;
            this.query.covertResponses(data);
        })
    }
    doInfinite(infiniteScroll){
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.topicServiceProvider.listReply(this.query).then(
                data => {
                    this.replys = this.replys.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }

    send(){
        let reply:Reply=new Reply;
        reply.topicId=this.topic.topicId;
        reply.topic=new Topic;
        reply.topic.topicId=this.topic.topicId;
        reply.content=this.comment;
        reply.author=new Author;
        reply.author.accountName=CompanyServiceProvider.getLoginCompany().accountName;
        this.topicServiceProvider.saveReply(reply).then(data=>{
            if (data == 'success') {
                this.toastCtrl.create({message: '发送成功', duration: 1000}).present();
                this.comment='';
                this.ngOnInit();
            }
        },error=>{
            this.toastCtrl.create({message: '发送失败', duration: 1000}).present();
        })
    }

    praise(){
        this.topicServiceProvider.updatePraise(this.topic.topicId,CompanyServiceProvider.getLoginCompany().accountName).then(data=>{
            this.topic=data;
            this.toastCtrl.create({message:'点赞成功',duration:1000}).present()
        },error=>{
            this.toastCtrl.create({message: error.error, duration: 1000}).present();
        })
    }

}
