import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TopicServiceProvider} from "../../providers/topic-service/topic-service";
import {Topic} from "../../domain/Topic";
import {PageQuery} from "../../common/PageQuery";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the TopicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-topics',
    templateUrl: 'topics.html',
})
export class TopicsPage {
    imgUrl: string = AppConfig.imgFace;
    tabItems = [];
    selectedTabIndex: number = 0;
    topics: Topic[] = [];
    query: PageQuery = new PageQuery();

    constructor(public navCtrl: NavController, public navParams: NavParams, public topicServiceProvider: TopicServiceProvider) {
        this.topicServiceProvider.listBoards().then(data => {
            data.forEach(topic => {
                this.tabItems.push({tabName: topic.boardName, tabId: topic.boardId})
            })
            this.pageFilterMeasure(0, this.tabItems[0]);
        })
    }

    swipEvent(event) {
        if (event.direction == 2&&event.angle<0) {
            console.log('left');
            if(this.selectedTabIndex!=this.tabItems.length){
                this.pageFilterMeasure(this.selectedTabIndex+1,this.tabItems[this.selectedTabIndex+1])
            }
        }
        if (event.direction == 4&&(event.angle<2||event>-1)) {
            console.log('right');
            if(this.selectedTabIndex!=0){
                this.pageFilterMeasure(this.selectedTabIndex-1,this.tabItems[this.selectedTabIndex-1])
            }
        }

    }


    ionViewWillEnter() {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TopicsPage');
    }

    pageFilterMeasure(index, tabItem) {
        this.query.clearParamsRequests();
        this.selectedTabIndex = index;
        this.query.pushParamsRequests("boardId", tabItem.tabId);
        this.topicServiceProvider.topics(this.query).then(data => {
            this.topics = data.content;
        })
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.topicServiceProvider.topics(this.query).then(data => {
                this.topics = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete());
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.topicServiceProvider.topics(this.query).then(
                data => {
                    this.topics = this.topics.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }

    openTopic(topic: Topic) {
        this.navCtrl.push('TopicReplyPage', {topicId: topic.topicId});
    }

    addTopic() {
        this.navCtrl.push('AddTopicPage',);
    }

}
