import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from 'ionic-angular';
import {PageQuery} from "../../common/PageQuery";
import {ChatItem} from "../../domain/ChatItem";
import {ChatServiceProvider, MessageHandler} from "../../providers/chat-service/chat-service";
import {FormBuilder, FormControl} from "@angular/forms";
import {FileChooser} from "@ionic-native/file-chooser";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {Storage} from "@ionic/storage";
import {ChatLogVo} from "../../vo/ChatLogVo";
import {CHAT_ITEM} from "../../app/Constants";

/**
 * Generated class for the GroupChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-group-chat',
    templateUrl: 'group-chat.html',
})
export class GroupChatPage implements MessageHandler {
    chatItem: ChatItem = new ChatItem;

    myName: string;
    myOfAccount: string;
    myAvatar: string = '';

    pageQuery: PageQuery = new PageQuery();
    @ViewChild(Content) content: Content;
    @ViewChild('myInput') myInput: ElementRef;

    public messageForm: any;
    chatBox: any;

    toggled = false;

    constructor(private navCtrl: NavController, public storage: Storage, private formBuilder: FormBuilder, private navParams: NavParams, private chatService: ChatServiceProvider,
                private modalCtrl: ModalController, private events: Events,
                // public fileService: FileService,
                private nativeService: NativeServiceProvider,
                private fileChooser: FileChooser) {
        let roomName = this.navParams.get("chatItem").chatRoom.roomName;
        this.chatItem = this.navParams.get("chatItem");
        this.messageForm = formBuilder.group({
            message: new FormControl('')
        });
        this.chatBox = "";

        this.myName = CompanyServiceProvider.getLoginCompany().companyName;
        this.myAvatar = CompanyServiceProvider.getLoginCompany().portraitUrl;
        this.myOfAccount = CompanyServiceProvider.getLoginCompany().accountName;
        this.chatService.registerEvent(this);
        this.chatService.chatting = roomName;
        //通知messagePage 将未读消息置空
        this.events.publish("CHATTING", roomName);

        // //查询聊天记录
        this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
            if (chatItems) {
                chatItems.forEach(chatItem => {
                    if (chatItem.friendOfAccount == roomName) {
                        if (chatItem.chatLogList) {
                            this.chatItem = chatItem;
                            this.scrollToBottom();
                        }
                    }
                })
            }
        });

    }

    onMessage(msg, myself) {
        if (msg.roomName == this.chatItem.chatRoom.roomName) {
            if (!this.chatItem.lastTime||this.chatItem.chatLogList.length == 0 || (this.chatItem.chatLogList.length != 0 && this.chatItem.chatLogList[this.chatItem.chatLogList.length-1].createDate < msg.stamp)) {
                this.addNewMessage(msg.id, msg.from, this.myOfAccount, msg.msg, msg.stamp);
                this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
                    if (chatItems && chatItems.length != 0) {
                        chatItems.forEach(chatItem => {
                            if (chatItem.chatRoom.roomName == this.chatItem.chatRoom.roomName) {
                                if(chatItem.chatLogList.length!=this.chatItem.chatLogList.length){
                                    chatItem.chatLogList = this.chatItem.chatLogList;
                                    chatItem.lastMessage = msg.msg;
                                }
                            }
                        })
                        this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems);
                    }
                });
            }
        }
    }

    onEvent(msg, event) {
        if (event == "out" && msg.roomName == this.chatItem.chatRoom.roomName) {
            this.navCtrl.pop();
            this.nativeService.showToast("您已被移除此群");
        }
    }

    ionViewWillUnload() {
        this.chatService.unRegisterEvent(this);
        this.chatService.chatting = null;
    }

    doRefresh(refresher: Refresher) {
        if (!this.pageQuery.isLast()) {
            this.pageQuery.plusPage();
            this.chatService.pageChatLogs(this.pageQuery).then(
                data => {
                    this.chatItem.chatLogList = data.content.concat(this.chatItem.chatLogList);
                    this.pageQuery.covertResponses(data);
                    refresher.complete();
                },
                err => refresher.complete()
            );
        } else {
            refresher.complete();
        }
    }

    send(message: any) {
        if (message && message != "") {
            this.chatService.sendGroupMessage(message, this.chatItem.chatRoom.roomName);
        }
        this.chatBox = "";
        // this.addNewMessage(ChatPage.ID, CompanyServiceProvider.getLoginCompany().accountName, this.chatItem.chatRoom.roomName, message)
        //
        // //  save message to storage
        // let chatItems: ChatItem[] = []
        // this.storage.get('chatItems' + CompanyServiceProvider.getLoginCompany().accountName).then(data => {
        //     if (data && data.length != 0) {
        //         chatItems = data
        //         chatItems.forEach(chatItem => {
        //             if (chatItem.friendOfAccount == this.chatItem.friendOfAccount) {
        //                 chatItem.chatLog = this.chatItem.chatLogList;
        //                 chatItem.lastMessage = message;
        //             }
        //         })
        //     } else {
        //         this.chatItem.chatLog = this.chatItem.chatLogList;
        //         this.chatItem.lastTime = new Date;
        //         this.chatItem.lastMessage = this.chatItem.chatLogList[this.chatItem.chatLogList.length - 1].content;
        //         chatItems.push(this.chatItem);
        //     }
        //     this.storage.set('chatItems' + CompanyServiceProvider.getLoginCompany().accountName, chatItems);
        // });
    }

    // sendPic() {
    //     this.nativeService.getPictureByPhotoLibrary().subscribe(
    //         data => {
    //             this.fileUpload(data, IMAGE_TYPE);
    //         }
    //     )
    // }
    //
    // sendCamera() {
    //     this.nativeService.getPictureByCamera().subscribe(
    //         data => {
    //             this.fileUpload(data, IMAGE_TYPE);
    //         }
    //     )
    // }
    //
    // sendFile() {
    //     this.fileChooser.open()
    //         .then(data => {
    //             this.fileUpload(data, FILE_TYPE);
    //         })
    //         .catch(e => this.nativeService.showToast("文件处理失败，请稍后再试！"));
    // }

    fileUpload(data, start) {
        // this.fileService.uploadFile(data).then(
        //     response => {
        //         if (response.result == SUCCESS) {
        //             let fileAttr = response.data;
        //             let atta = new Attachment();
        //             atta.fileName = fileAttr.fileName;
        //             atta.filePath = fileAttr.filePath;
        //             atta.fileSize = fileAttr.fileSize;
        //             atta.fileType = fileAttr.fileType;
        //             this.buildMessage(atta, start);
        //         } else {
        //             this.nativeService.showToast("文件处理失败，" + response.message);
        //         }
        //     }
        // )
    }

    buildMessage(atta, start) {
        let message = start + JSON.stringify(atta);
        this.send(message);
    }

    addNewMessage(id, sender, receiver, message, time) {
        let chatLog = new ChatLogVo(id, sender, receiver, message, time);
        this.chatItem.chatLogList.push(chatLog);
        this.scrollToBottom();
    }

    // /**
    //  * 预览图片
    //  * @param index
    //  */
    // picView(event) {
    //     if(!event.target.currentSrc.includes("/assets/images")){
    //         let photos = [];
    //         let tempPhoto = {
    //             title: " ",
    //             url: event.target.currentSrc,
    //         };
    //         photos.push(tempPhoto);
    //         let modal = this.modalCtrl.create(GalleryModal, {
    //             photos: photos,
    //         });
    //         modal.present();
    //     }
    // }

    scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 100);
    }

    /**
     * 获取头像
     */
    getAvatar(ofAccount) {
        // let len = this.chatItem.chatRoom.chatItems.length;
        // for (let i = 0; i < len; i++) {
        //     if (this.chatItem.chatRoom.chatItems[i].friendOfAccount == ofAccount) {
        //         return this.chatItem.chatRoom.chatItems[i].avatarImage;
        //     }
        // }
        // len = this.chatItem.chatRoom.adminItems.length;
        // for (let i = 0; i < len; i++) {
        //     if (this.chatItem.chatRoom.adminItems[i].friendOfAccount == ofAccount) {
        //         return this.chatItem.chatRoom.adminItems[i].avatarImage;
        //     }
        // }
        return "";
    }

    openGroupDetail() {
        this.navCtrl.push("GroupDetailPage", {chatRoom: this.chatItem.chatRoom});
    }

    handleSelection(emoji) {
        this.messageForm.controls["message"].setValue(this.messageForm.value.message + emoji);
    }

    showEmoji(show) {
        this.toggled = show;
        this.resizeContent();
    }

    resizeContent() {
        setTimeout(() => {
            this.content.resize();
            setTimeout(() => {
                this.content.scrollToBottom();
            }, 10);
        }, 100)
    }
}
