import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Article} from "../../domain/Article";
import {AppConfig} from "../../app/AppConfig";
import {ArticleChannelServiceProvider} from "../../providers/article-channel-service/article-channel-service";

/**
 * Generated class for the ArticleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-article-detail',
    templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {
    article: Article;
    imgUrl: string = AppConfig.imgFace;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private articleChannelServiceProvider: ArticleChannelServiceProvider) {
    }

    ngOnInit(): void {
        this.articleChannelServiceProvider.viewArticle(this.navParams.get('articleId')).then(data => {
            this.article = data;

        })
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticleDetailPage');
    }

}
