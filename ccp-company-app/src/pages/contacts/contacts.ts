import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatItem} from "../../domain/ChatItem";
import {ChatPage} from "../chat/chat";
import {Author} from "../../domain/Author";
import {Storage} from "@ionic/storage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {CHAT_ITEM} from "../../app/Constants";
import {AppConfig} from "../../app/AppConfig";

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html',
})
export class ContactsPage {
    author: Author = new Author;

    imgUrl: string = AppConfig.imgFace;

    chatItems: ChatItem[] = [];

    constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
            this.chatItems = chatItems;
        })
        console.log('ionViewDidLoad ContactsPage');
    }

    addGroup() {
        this.navCtrl.push('AddGroupPage');
    }

    send(author: Author) {
        author.portraitUrl = 'http://218.16.121.13:8501/web/upload/face//designer/csyg.jpg';
        author.authorName = '印国';
        author.accountName = 'csyg';
        let chatItem = new ChatItem();
        chatItem.friendName = author.authorName;
        chatItem.friendOfAccount = author.accountName;
        chatItem.avatarImage = author.portraitUrl;
        chatItem.lastMessage = '';
        chatItem.chatLog = [];
        let parentPage = this.navCtrl.getPrevious();

        let chatItems: ChatItem[] = []
        this.storage.get(CHAT_ITEM).then(data => {
            if (data != null) {
                chatItems = data
                let exitChatItem: ChatItem = chatItems.find(chatItem1 => {
                    return chatItem1.friendOfAccount == chatItem.friendOfAccount
                })
                if (!exitChatItem) {
                    chatItems.push(chatItem);
                }
                this.storage.set(CHAT_ITEM, chatItems);
            }
        });

        // if(parentPage.instance instanceof ChatPage){
        //     this.navCtrl.pop();
        // }else {
        let nav = this.navCtrl.getByIndex(0);
        this.navCtrl.popToRoot();
        nav.getNav().push('ChatPage', {chatItem: chatItem})
        // }
    }

    goToChat(chatItem: ChatItem) {
        if (chatItem.group) {
            this.navCtrl.push("GroupChatPage", {chatItem: chatItem});
        } else {
            this.navCtrl.push("ChatPage", {chatItem: chatItem});
        }
    }

}
