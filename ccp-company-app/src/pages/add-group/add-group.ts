import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormPage} from "../../common/formPage";
import {FormBuilder, Validators} from "@angular/forms";
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {ChatItem} from "../../domain/ChatItem";
import {Storage} from "@ionic/storage";
import {CHAT_ITEM} from "../../app/Constants";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {FileServiceProvider} from "../../providers/file-service/file-service";
import {AppConfig} from "../../app/AppConfig";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";

/**
 * Generated class for the AddGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-group',
    templateUrl: 'add-group.html',
})
export class AddGroupPage extends FormPage {

    imgUrl: string = AppConfig.imgFace + 'groupAvatar/';
    imgFace: string = AppConfig.imgFace;

    constructor(public modalCtrl: ModalController, public demandService: DemandServiceProvider, public fileServiceProvider: FileServiceProvider, public nativeServiceProvider: NativeServiceProvider, public chatService: ChatServiceProvider, public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController,
                private fb: FormBuilder,) {
        super();
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            demand: [null, Validators.compose([Validators.required])],
            members: [[], Validators.compose([Validators.required])],
            naturalName: ['', Validators.compose([Validators.required, Validators.maxLength(128)])],
            number: ['', Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.maxLength(65535)])],
            avatarImg: ['', Validators.compose([Validators.maxLength(512)])],
            creator: [CompanyServiceProvider.getLoginCompany().accountName],
            authors: [[]],
        });
        // let demand = new Demand();
        // demand.demandId = 1;
        // this.formGroup.patchValue({
        //     groupName: 'test',
        //     demand: demand,
        //     number: 3,
        //     members: ['csyg@ccp', 'zcgy@ccp'],
        //     authors: [{accountName: 'csyg', authorName: '印国'}, {accountName: 'zcgy', authorName: '中车贵阳（zcgy）'}]
        // })
    }

    chooseAvatar() {
        this.nativeServiceProvider.getPhoto().subscribe(data => {
            this.fileServiceProvider.uploadFile(data, "/file/uploadGroupAvatar.do", new Date().getTime()).then(data => {
                if (data.result == 'SUCCESS') {
                    this.formGroup.patchValue({
                        avatarImg: data.data
                    })
                    // this.company.portraitUrl=data.data;
                    this.toastCtrl.create({message: '修改头像成功', duration: 1000}).present();
                } else {
                    this.toastCtrl.create({message: '修改头像失败', duration: 1000}).present();
                }
            })
        })
    }

    chooseDemand() {
        this.demandService.listAllDemandsByCompany(CompanyServiceProvider.getLoginCompany().companyId).then(demands => {
            if (demands) {
                let alert = this.alertCtrl.create();
                alert.setTitle("请选择任务")
                demands.forEach(demand => {
                    if (this.formGroup.value.demand && demand.demandId == this.formGroup.value.demand.demandId) {
                        alert.addInput({
                            value: demand.demandId.toString(),
                            type: 'radio',
                            label: demand.demandName,
                            checked: true,
                        });
                    } else {
                        alert.addInput({
                            value: demand.demandId.toString(),
                            type: 'radio',
                            label: demand.demandName,
                            checked: false,
                        });
                    }
                })
                alert.addButton({
                    text: '确定',
                    handler: (value: any) => {
                        let demand = demands.filter(demand => demand.demandId == value)[0];
                        this.formGroup.patchValue({
                            demand: demand
                        })
                    }
                })
                alert.present();
            }
        }, error => {
            this.toastCtrl.create({message: error.error, duration: 1000}).present();
        })
    }

    addMember() {
        if (this.formGroup.value.demand) {
            this.demandService.listAllUsersByDemand(this.formGroup.value.demand.demandId).then(authors => {
                if (authors) {
                    let find = authors.find(author => author.accountName == CompanyServiceProvider.getLoginCompany().accountName);
                    if (find) {
                        authors.splice(authors.indexOf(find), 1)
                    }
                    // let authors = [{accountName: 'csyg', authorName: '印国'}, {accountName: 'zcgy', authorName: '中车贵阳（zcgy）'}]
                    let modal = this.modalCtrl.create('MultiSelectModalPage', {items: authors, select: this.formGroup.value.authors, checkName: 'accountName'});
                    modal.present();
                    modal.onDidDismiss(selectAuthors => {
                        if (selectAuthors) {
                            this.formGroup.patchValue({
                                authors: selectAuthors
                            })
                            let members = [];
                            selectAuthors.forEach(author => {
                                members.push(author.accountName + AppConfig.openFireServiceName);
                            })
                            members.push(CompanyServiceProvider.getLoginCompany().accountName + AppConfig.openFireServiceName)
                            this.formGroup.patchValue({
                                members: members,
                                number: members.length,
                            })
                        }
                    })
                }

            }, error => {
                this.toastCtrl.create({message: error.error, duration: 1000}).present();
            })
        } else {
            this.toastCtrl.create({message: '请选择任务', duration: 1000}).present();
        }
    }

    onSubmit() {
        if (this.formGroup.value.members.length >= 2) {
            this.chatService.createChatRoom(this.formGroup.value).then(data => {
                if (data.result == 'SUCCESS') {
                    this.toastCtrl.create({message: data.message, duration: 1000}).present();
                    let chatRoomVo = data.data;
                    chatRoomVo.manager = true;
                    chatRoomVo.authors.push(CompanyServiceProvider.getLoginCompany());
                    let chatItem = new ChatItem();
                    chatItem.group = true;
                    chatItem.chatLogList = [];
                    chatItem.avatarImage = data.data.avatarImg;
                    chatItem.friendOfAccount = data.data.roomName;
                    chatItem.friendName = data.data.naturalName;
                    chatItem.friendName = data.data.naturalName;
                    chatItem.lastMessage = '';
                    chatItem.lastTime = new Date;
                    chatItem.chatRoom = chatRoomVo;
                    let chatItems: ChatItem[] = [];
                    this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(data1 => {
                        if (data1) {
                            chatItems = data1
                        }
                        chatItems.push(chatItem);
                        this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems);
                        this.navCtrl.popTo(this.navCtrl.getViews()[this.navCtrl.getViews().length - 3]);
                        this.chatService.joinInChatRoom(data.data.roomName);
                    });

                } else {
                    this.toastCtrl.create({message: data.message, duration: 1000}).present();
                }
            })
        } else {
            this.toastCtrl.create({message: '至少选择两个成员', duration: 1000}).present();
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddGroupPage');
    }

}
