import {Component} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {ChatItem} from "../../domain/ChatItem";
import {ChatServiceProvider, MessageHandler} from "../../providers/chat-service/chat-service";
import {Storage} from "@ionic/storage";
import {CustomerServiceProvider} from "../../providers/customer-service/customer-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {AppConfig} from "../../app/AppConfig";
import {ContractServiceProvider} from "../../providers/contract-service/contract-service";
import {ChatLogVo} from "../../vo/ChatLogVo";
import {ChatRoomVo} from "../../domain/ChatRoomVo";
import {CHAT_ITEM, INIT_DATA} from "../../app/Constants";

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements MessageHandler {

    imgUrl: string = AppConfig.imgFace;

    totalUnreadNumber: number = 0;

    chatItems: ChatItem[] = [];

    voiceNotice: boolean;
    barNotice: boolean;
    unReadNotice: boolean;
    // messageStat:MessageStatistics;

    tabs = "chat";


    constructor(public contractService: ContractServiceProvider, public navCtrl: NavController, public events: Events, public chatService: ChatServiceProvider, public storage: Storage, public customerService: CustomerServiceProvider) {
        if (CompanyServiceProvider.isLogin()) {
            this.initData();
        }
        this.events.subscribe(INIT_DATA, data => {
            this.initData();
        })
        this.events.subscribe("CHATTING", ofAccount => {
            if (ofAccount) {
                let chatItem = this.getChatByOfAccount(ofAccount);
                if (chatItem) {
                    this.unreadNumberChange(chatItem, -chatItem.unreadNumber);
                }
            }
        });
    }

    private initData() {
        BOSH_SERVICE = AppConfig.openFireURL;
        this.chatService.registerEvent(this);
        this.chatService.connect(CompanyServiceProvider.getLoginCompany().accountName, CompanyServiceProvider.getLoginCompany().password);
        // get chatItems from storage
        this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(data => {
            if (data != null) {
                this.chatItems = data
            }
        });
    }

    ionViewWillEnter() {
        if (CompanyServiceProvider.isLogin()) {
            this.initData();
        }

    }


    openContacts() {
        this.navCtrl.push('ContactsPage');
    }


    /**
     * openfire消息接收
     * @param msg
     * @param myself
     */
    onMessage(msg, myself) {
        if (!myself) {
            let chatItem = this.handelMessage(msg, myself);
            if ((msg.group && msg.roomName != this.chatService.chatting) || (!msg.group && msg.from != this.chatService.chatting)) {
                this.unreadNumberChange(chatItem, 1);
            }
            //save message to storage
            this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, this.chatItems);
        }

    }

    /**
     * openfire事件接收
     * @param msg
     * @param event
     */
    onEvent(msg, event) {
        if (event == "out") {
            //群组解散或者被移除群组
            let roomName = msg.roomName;
            let chat = this.getChatByOfAccount(roomName);
            this.removeChatItem(chat);
            this.unreadNumberChange(chat, -chat.unreadNumber);
        }
    }

    removeChatItem(chatItem: ChatItem) {
        let index = this.chatItems.indexOf(chatItem);
        if (index >= 0) {
            this.chatItems.splice(index, 1);
        }
    }

    handelMessage(msg, myself): ChatItem {
        let group = msg.group;
        let chat = this.getChatByOfAccount(group ? msg.roomName : myself ? msg.to : msg.from);
        if (chat) {
            let chatLog = new ChatLogVo(msg.id, msg.from, CompanyServiceProvider.getLoginCompany().accountName, msg.msg, msg.stamp);
            if (group) {
                if (!chat.lastTime || chat.chatLogList.length == 0 || (chat.chatLogList.length != 0 && chat.chatLogList[chat.chatLogList.length - 1].createDate < msg.stamp)) {
                    chat.chatLogList.push(chatLog);
                }
            } else {
                if (myself) {
                    chatLog.createDate = new Date;
                }
                if (chat.chatLog.length == 0 || chat.chatLog[chat.chatLog.length - 1].id != msg.id) {
                    chat.chatLog.push(chatLog);
                }
            }
            chat.lastMessage = msg.msg;
            chat.lastTime = msg.stamp;
            this.removeChatItem(chat);
            this.chatItems.unshift(chat);
            if (!myself) {
                this.showNotification(chat.friendName + ":" + chat.lastMessage);
            }
        } else {
            chat = this.addContact(msg, myself);
        }
        // chat.unreadNumber++;
        return chat;
    }

    /**
     * 新增聊天联系人
     * @param msg
     * @param myself
     */
    addContact(msg, myself): ChatItem {
        let chat = new ChatItem();
        chat.lastMessage = msg.msg;
        chat.lastTime = msg.stamp;
        chat.chatLog = [];
        let code = "";
        if (!msg.group) {
            //个人消息
            chat.group = false;
            chat.friendOfAccount = myself ? msg.to : msg.from;
            // code = StaffSession.parseUserCode(chat.friendOfAccount);
            let chatLog = new ChatLogVo(msg.id, msg.from, CompanyServiceProvider.getLoginCompany().accountName, msg.msg, msg.stamp);
            chat.chatLog.push(chatLog)
            this.contractService.getContactUserInfo(chat.friendOfAccount).then(data => {
                chat.avatarImage = data.portraitUrl;
                chat.friendName = data.authorName;
                // this.chatItems.unshift(chat);
                // console.log('contact add chatItem')
                // // this.chatItems.
                this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
                    if (!this.chatItems.find(item => {
                            return item.friendOfAccount == chat.friendOfAccount
                        })) {
                        this.chatItems.unshift(chat);
                        this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, this.chatItems)
                    }
                })
            }, error => {
                this.chatItems.unshift(chat);
            })
        } else {
            //群消息
            chat.group = true;
            chat.chatRoom = new ChatRoomVo;
            chat.chatRoom.roomName = msg.roomName;
            chat.friendOfAccount = msg.roomName;
            chat.chatLogList = [];
            let chatLog = new ChatLogVo(msg.id, msg.from, CompanyServiceProvider.getLoginCompany().accountName, msg.msg, new Date);
            chat.chatLogList.push(chatLog);
            code = msg.roomName;
            this.chatItems.push(chat);
        }
        return chat;
    }

    getChatByOfAccount(ofAccount) {
        return this.chatItems.find(item => {
            return item.friendOfAccount == ofAccount
        });
    }


    goToChat(chatItem: ChatItem) {
        if (chatItem.group) {
            this.navCtrl.push("GroupChatPage", {chatItem: chatItem,chatItems:this.chatItems});
        } else {
            this.navCtrl.push("ChatPage", {chatItem: chatItem});
        }
    }

    unreadNumberChange(chatItem, diff) {
        let number = chatItem.unreadNumber + diff;
        number = number < 0 ? 0 : number;
        chatItem.unreadNumber = number;
        number = this.totalUnreadNumber + diff;
        number = number < 0 ? 0 : number;
        this.totalUnreadNumber = number;
        this.notifyTabUnReadNumber();
        this.saveUnreadNumber(chatItem.friendOfAccount, chatItem.unreadNumber);
    }

    saveUnreadNumber(account, number) {
        this.storage.set(account, number);
    }

    checkUnreadNumber() {
        this.chatItems.forEach(chatItem => {
            this.getUnreadNumber(chatItem.friendOfAccount).then(
                data => {
                    if (data) {
                        let number = Number.parseInt(data);
                        if (number > 0) {
                            chatItem.unreadNumber = number;
                            this.totalUnreadNumber = this.totalUnreadNumber + number;
                            this.notifyTabUnReadNumber();
                        }
                    }
                }
            );
        });
    }

    getUnreadNumber(account): Promise<any> {
        return this.storage.get(account);
    }

    showNotification(text) {
        if (this.barNotice) {
            // this.localNotifications.schedule({
            //     id: 1,
            //     text: text
            //     // sound: this.nativeService.isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
            // });
        }
    }

    /**
     * 未读消息数量变化
     * 通知Tab菜单
     */
    notifyTabUnReadNumber() {
        if (this.unReadNotice) {
            this.events.publish("UNREAD_NUMBER_CHANGE", this.totalUnreadNumber);
        } else {
            this.events.publish("UNREAD_NUMBER_CHANGE", 0);
        }

    }

    // messagePageStatistics(){
    //     this.systemService.messagePageStatistics(StaffSession.getStaffId()).then(
    //         data => {
    //             if(data.result==SUCCESS){
    //                 this.messageStat = data.data;
    //             }
    //         }
    //     );
    // }
}
