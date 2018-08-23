import {FormBuilder, FormControl} from "@angular/forms";
import {Component, ViewChild} from "@angular/core";
import {Content, Events, IonicPage, ModalController, NavController, NavParams, Refresher} from "ionic-angular";
import {ChatItem} from "../../domain/ChatItem";
import {FileChooser} from "@ionic-native/file-chooser";
// import {FILE_TYPE, IMAGE_TYPE, RETROSPECTIVE, SUCCESS} from "../common/Constants";
// import {GalleryModal} from "ionic-gallery-modal";
import {ChatServiceProvider, MessageHandler} from "../../providers/chat-service/chat-service";
import {PageQuery} from "../../common/PageQuery";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {ChatLogVo} from "../../vo/ChatLogVo";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {AppConfig} from "../../app/AppConfig";
import {Storage} from "@ionic/storage";
import {CHAT_ITEM, INIT_DATA} from "../../app/Constants";

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage implements MessageHandler {


    chatItem: ChatItem;
    chatItems: ChatItem[] = [];

    myName: string;
    myOfAccount: string;
    myAvatar: string = '';

    pageQuery: PageQuery = new PageQuery();
    @ViewChild(Content) content: Content;

    public messageForm: any;

    toggled = false;

    chatBox: any;

    static ID: string = 'MYSELF'

    imgUrl: string = AppConfig.imgFace;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public storage: Storage, public navParams: NavParams, private chatService: ChatServiceProvider,
                public modalCtrl: ModalController, public events: Events, public nativeService: NativeServiceProvider,
                // public fileService: FileService,
                private fileChooser: FileChooser,) {
        this.chatItem = this.navParams.get('chatItem');
        this.messageForm = formBuilder.group({
            message: new FormControl('')
        });
        this.chatBox = "";
        this.myName = CompanyServiceProvider.getLoginCompany().companyName;
        this.myAvatar = CompanyServiceProvider.getLoginCompany().portraitUrl;
        this.myOfAccount = CompanyServiceProvider.getLoginCompany().accountName;
        this.chatService.registerEvent(this);
        this.chatService.chatting = this.chatItem.friendOfAccount;
        //通知messagePage 将未读消息置空
        this.events.publish("CHATTING", this.chatItem.friendOfAccount);
        this.scrollToBottom();
    }

    onMessage(msg, myself) {
        if (!msg.group && msg.from == this.chatItem.friendOfAccount) {
            console.info(msg.msg);
            if (!myself && (this.chatItem.chatLog.length == 0 || this.chatItem.chatLog[this.chatItem.chatLog.length - 1].id != msg.id)) {
                this.addNewMessage(this.chatItem.friendOfAccount, this.myOfAccount, msg.msg);
                //  save message to storage
                this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
                    chatItems.forEach(chatItem => {
                        if (chatItem.friendOfAccount == this.chatItem.friendOfAccount) {
                            if (this.chatItem.chatLog[this.chatItem.chatLog.length - 1].id != msg.id) {
                                chatItem = this.chatItem;
                                chatItem.lastMessage = msg.msg;
                                chatItem.lastTime = new Date();
                            }
                        }
                    });
                    this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems);
                })

            }
        }
    }

    onEvent(msg, event) {

    }

    ionViewWillUnload() {
        this.chatService.unRegisterEvent(this);
        this.chatService.chatting = null;
    }

    doRefresh(refresher: Refresher) {
        // if (!this.pageQuery.isLast()) {
        //     this.pageQuery.plusPage();
        //     // this.chatService.pageChatLogs(this.pageQuery).then(
        //     //     data => {
        //     //         this.items = data.content.concat(this.items);
        //     //         this.pageQuery.covertResponses(data);
        //     //         refresher.complete();
        //     //     },
        //     //     err => refresher.complete()
        //     // );
        // } else {
        //     refresher.complete();
        // }
    }

    send(message: any) {
        if (message && message != "") {
            this.chatService.sendMessage(message, this.chatItem.friendOfAccount);
            let time = new Date();
            let chatLog = new ChatLogVo(ChatPage.ID, this.myOfAccount, this.chatItem.friendOfAccount, message, time);
            this.chatItem.chatLog.push(chatLog);
            this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
                chatItems.forEach(chatItem => {
                    if (chatItem.friendOfAccount == this.chatItem.friendOfAccount) {
                        chatItem.chatLog = this.chatItem.chatLog;
                        chatItem.lastMessage = message;
                        chatItem.lastTime = new Date();
                    }
                });
                this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems).catch(e => {
                    alert(e)
                });
                this.events.publish(INIT_DATA);
            })
            this.scrollToBottom();
        }
        this.chatBox = "";

    }

    sendPic() {
        // this.nativeService.getPictureByPhotoLibrary().subscribe(
        //     data => {
        //         this.fileUpload(data, IMAGE_TYPE);
        //     }
        // )
    }

    sendCamera() {
        // this.nativeService.getPictureByCamera().subscribe(
        //     data => {
        //         this.fileUpload(data, IMAGE_TYPE);
        //     }
        // )
    }

    sendFile() {
        // this.fileChooser.open()
        //     .then(data => {
        //         this.fileUpload(data, FILE_TYPE);
        //     })
        //     .catch(e => this.nativeService.showToast("文件处理失败，请稍后再试！"));
    }

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

    addNewMessage(sender, receiver, message) {
        let time = new Date();
        let chatLog = new ChatLogVo(ChatPage.ID, sender, receiver, message, time);
        this.chatItem.chatLog.push(chatLog);
        this.scrollToBottom();
    }

    /**
     * 预览图片
     * @param index
     */
    picView(event) {
        // if(!event.target.currentSrc.includes("/assets/images")){
        //     let photos = [];
        //     let tempPhoto = {
        //         title: " ",
        //         url: event.target.currentSrc,
        //     };
        //     photos.push(tempPhoto);
        //     let modal = this.modalCtrl.create(GalleryModal, {
        //         photos: photos,
        //     });
        //     modal.present();
        // }

    }

    detail() {
        this.navCtrl.push('CustomerDetailPage', {accountName: this.chatItem.friendOfAccount});
    }

    openStaff() {
        this.navCtrl.push('StaffPage', {friendOfAccount: this.chatItem.friendOfAccount});
    }

    scrollToBottom() {
        setTimeout(() => {

            this.content.scrollToBottom();
        }, 100);
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
