import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppConfig} from "../../app/AppConfig";
import {PageQuery} from "../../common/PageQuery";
import {ArticleChannelServiceProvider} from "../../providers/article-channel-service/article-channel-service";
import {Article} from "../../domain/Article";

/**
 * Generated class for the HelpCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-help-center',
    templateUrl: 'help-center.html',
})
export class HelpCenterPage {

    imgUrl: string = AppConfig.imgFace;
    tabItems = [];
    selectedTabIndex: number = 0;
    articles: Article[] = [];
    query: PageQuery = new PageQuery();

    constructor(public navCtrl: NavController, public navParams: NavParams, public articleChannelServiceProvider: ArticleChannelServiceProvider) {
        this.articleChannelServiceProvider.getArticleChannelByCode("AC_1").then(data => {
            this.articleChannelServiceProvider.listProgramas(data == null ? 8 : data.channelId).then(data => {
                data.forEach(programa => {
                    this.tabItems.push({tabName: programa.programaName, tabId: programa.programaId})
                })
                this.pageFilterMeasure(0, this.tabItems[0]);
            })
        });
    }

    ionViewWillEnter() {

    }

    pageFilterMeasure(index, tabItem) {
        this.query.clearParamsRequests();
        this.selectedTabIndex = index;
        this.query.pushParamsRequests("programaId", tabItem.tabId);
        this.articleChannelServiceProvider.listArticles(this.query).then(data => {
            this.articles = data.content;
        })
    }

    doRefresh(refresher) {
        this.query.resetRequests();
        this.articleChannelServiceProvider.listArticles(this.query).then(data => {
                this.articles = data.content;
                this.query.covertResponses(data);
                refresher.complete();
            },
            err => refresher.complete());
    }


    doInfinite(infiniteScroll) {
        if (!this.query.isLast()) {
            this.query.plusPage();
            this.articleChannelServiceProvider.listArticles(this.query).then(
                data => {
                    this.articles = this.articles.concat(data.content);
                    this.query.covertResponses(data);
                    infiniteScroll.complete();
                },
                err => infiniteScroll.complete()
            );
        } else {
            infiniteScroll.complete();
        }
    }

    openArticle(article: Article) {
        this.navCtrl.push('ArticleDetailPage', {articleId: article.articleId});
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad HelpCenterPage');
    }

}
