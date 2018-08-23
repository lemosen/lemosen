import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ChatRoomVo} from "../../domain/ChatRoomVo";
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {FileServiceProvider} from "../../providers/file-service/file-service";
import {MultiSelectModalPage} from "../multi-select-modal/multi-select-modal";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Author} from "../../domain/Author";
import {Storage} from "@ionic/storage";
import {CHAT_ITEM} from "../../app/Constants";

/**
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-group-detail',
    templateUrl: 'group-detail.html',
})
export class GroupDetailPage {

    imgUrl: string = AppConfig.imgFace;

    isAdmin: boolean;

    chatRoom: ChatRoomVo;

    constructor(public storage: Storage, public toastCtrl: ToastController, public demandService: DemandServiceProvider, public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private chatService: ChatServiceProvider,
                private nativeService: NativeServiceProvider
        , private fileService: FileServiceProvider) {
        this.chatRoom = this.navParams.data.chatRoom;
        this.chatService.getGroupByRoomName(this.chatRoom.roomName).then(data => {
            this.chatRoom = data;
        }, error => {
            this.nativeService.showToast("查找失败！");
        })
    }

    ionViewDidLoad() {
        if (this.chatRoom.manager) {
            this.isAdmin = true;
        }
    }

    /**
     * 选择群成员
     */
    chooseStaffs() {
        // alert('暂无')
        this.demandService.listAllUsersByDemand(this.chatRoom.demandId).then(authors => {
            if (authors) {
                let find = authors.find(author => author.accountName == CompanyServiceProvider.getLoginCompany().accountName);
                if (find) {
                    authors.splice(authors.indexOf(find), 1)
                }
                this.chatRoom.authors.forEach(author1=>{
                    let find = authors.find(author => author.accountName == author1.accountName);
                    if (find) {
                        authors.splice(authors.indexOf(find), 1)
                    }
                })
                // let authors = [{accountName: 'csyg', authorName: '印国'}, {accountName: 'zcgy', authorName: '中车贵阳（zcgy）'}]
                let modal = this.modalCtrl.create('MultiSelectModalPage', {items: authors, select: [], checkName: 'accountName'});
                modal.present();
                modal.onDidDismiss(selectAuthors => {
                    if (selectAuthors && selectAuthors.length > 0) {
                        this.addStaffs(selectAuthors);
                    }
                })
            }

        }, error => {
            this.toastCtrl.create({message: error.error, duration: 1000}).present();
        })
        // let staffs = [];
        // this.chatRoom.adminItems.forEach(item => {
        //     let staff = {userCode: item.userCode};
        //     staffs.push(staff);
        // });
        // this.chatRoom.chatItems.forEach(item => {
        //     let staff = {userCode: item.userCode};
        //     staffs.push(staff);
        // });

        // let modal = this.modalCtrl.create(MultiStaffComponent, {displayMyself: false, disabledStaffs: staffs});
        // modal.onDidDismiss(staffs => {
        //     if (staffs && staffs.length > 0) {
        //         this.addStaffs(staffs);
        //     }
        // });
        // modal.present();
    }

    addStaffs(staffs) {
        let chatRoomSubmit = this.buildChatRoomForSubmit(staffs);
        this.chatService.addMemberToChatRoom(chatRoomSubmit).then(
            result => {
                if (result.result == 'SUCCESS') {
                    this.nativeService.showToast("添加成功！");
                    //添加成员到chatItem
                    staffs.forEach(staff => {
                        let item = new Author();
                        item.accountName = staff.accountName;
                        item.authorName = staff.authorName;
                        item.portraitUrl = staff.portraitUrl;
                        this.chatRoom.authors.push(item);
                    });
                    this.chatService.multipleInvitesToChatRoom(this.chatRoom.roomName, chatRoomSubmit["members"]);
                } else {
                    this.nativeService.showToast("添加失败！");
                }
            }
        )
    }

    removeStaffs() {
        // alert('暂无')
        // let staffs = [];
        // this.chatRoom.chatItems.forEach(item => {
        //     let staff = {
        //         userCode: item.userCode,
        //         staffId: item.staffId,
        //         staffName: item.friendName,
        //         avatarImg: item.avatarImage,
        //         selected: false,
        //     };
        //     staffs.push(staff);
        // });
        // let modal = this.modalCtrl.create(MultiSelectModalPage, {staffs: staffs});

        // let authors = [{accountName: 'csyg', authorName: '印国'}, {accountName: 'zcgy', authorName: '中车贵阳（zcgy）'}]
        let modal = this.modalCtrl.create('MultiSelectModalPage', {items: this.chatRoom.authors, select: [], checkName: 'accountName'});
        modal.present();
        modal.onDidDismiss(selectAuthors => {
            if (selectAuthors && selectAuthors.length > 0) {
                let chatRoomSubmit = this.buildChatRoomForSubmit(selectAuthors);
                this.chatService.removeChatRoomMembers(chatRoomSubmit).then(
                    result => {
                        if (result.result == 'SUCCESS') {
                            this.nativeService.showToast("移除成功！");
                            //移除chatItem
                            this.chatRoom.authors = this.chatRoom.authors.filter(
                                item => {
                                    let del = selectAuthors.find(
                                        staff => {
                                            return staff.accountName == item.accountName;
                                        });
                                    return !del;
                                });
                            this.chatService.kickOutMembers(this.chatRoom.roomName, chatRoomSubmit["members"]);
                        } else {
                            this.nativeService.showToast("移除失败！");
                        }
                    }
                )
            }
        })


        // let modal = this.modalCtrl.create(MultiSelectModalPage , {items: authors, select: this.formGroup.value.authors, checkName: 'accountName'});
        // modal.onDidDismiss(selectedStaffs => {
        //     if (selectedStaffs && selectedStaffs.length > 0) {
        //         let chatRoomSubmit = this.buildChatRoomForSubmit(selectedStaffs);
        //         this.chatService.removeChatRoomMembers(chatRoomSubmit).then(
        //             result => {
        //                 if (result.result == 'SUCCESS') {
        //                     this.nativeService.showToast("移除成功！");
        //                     //移除chatItem
        //                     this.chatRoom.chatItems = this.chatRoom.chatItems.filter(
        //                         item => {
        //                             let del = selectedStaffs.find(
        //                                 staff => {
        //                                     return staff.userCode == item.userCode;
        //                                 });
        //                             return !del;
        //                         });
        //                     this.chatService.kickOutMembers(this.chatRoom.roomName, chatRoomSubmit["members"]);
        //                 } else {
        //                     this.nativeService.showToast("移除失败！");
        //                 }
        //             }
        //         )
        //     }
        // });
        // modal.present();
    }

    buildChatRoomForSubmit(staffs) {
        if (staffs) {
            let chatRoomSubmit = new ChatRoomVo();
            chatRoomSubmit.roomName = this.chatRoom.roomName;
            //staffs
            chatRoomSubmit["authors"] = staffs;
            let members = [];
            staffs.forEach(
                staff => {
                    members.push(CompanyServiceProvider.getLoginCompany().accountName + AppConfig.openFireServiceName);
                });
            //of账号数组
            chatRoomSubmit["members"] = members;
            return chatRoomSubmit;
        }
    }


    changeGroupName() {
        let inputs = [{
            name: 'groupName',
            placeholder: '修改群名称',
            value: this.chatRoom.naturalName
        }];
        this.nativeService.alertConfirm("修改群名称", "", inputs).then(
            data => {
                if (data.groupName && data.groupName.length > 0 && data.groupName.length < 33) {
                    this.updateGroupNameAndDesc(data.groupName, this.chatRoom.description);
                } else {
                    this.nativeService.showToast("字数在1-32之间");
                }
            }
        )
    }

    changeDescription() {
        let inputs = [{
            name: 'description',
            placeholder: '修改群描述',
            value: this.chatRoom.description
        }];
        this.nativeService.alertConfirm("修改群描述", "", inputs).then(
            data => {
                if (data.description && data.description.length > 0) {
                    this.updateGroupNameAndDesc(this.chatRoom.naturalName, data.description);
                }
            }
        ).catch(e => {

        })
    }

    updateGroupNameAndDesc(groupName, description) {
        let chatRoomSubmit = new ChatRoomVo();
        chatRoomSubmit.roomName = this.chatRoom.roomName;
        chatRoomSubmit.naturalName = groupName;
        chatRoomSubmit.description = description;
        this.chatService.updateGroupNameOrDescribe(chatRoomSubmit).then(
            result => {
                if (result.result == 'SUCCESS') {
                    this.nativeService.showToast("保存成功！");
                    this.chatRoom.naturalName = groupName;
                    this.chatRoom.description = description;
                } else {
                    this.nativeService.showToast("保存失败！");
                }
            }
        )
    }

    /**
     * 退出群聊
     * 群组退出群聊 删除该群
     */
    quitChatRoom() {
        this.nativeService.alertConfirm("确定退出群聊吗？", this.isAdmin ? "您是群主，退出后将解散该群" : "").then(
            data => {
                if (this.isAdmin) {
                    this.chatService.deleteChatRoom(this.chatRoom.roomName,CompanyServiceProvider.getLoginCompany().accountName).then(
                        result => {
                            if (result.result == 'SUCCESS') {
                                //返回前两页
                                let pages = this.navCtrl.getViews().length;

                                let members = this.chatRoom.authors.map(chatItem => {
                                    return chatItem.accountName + AppConfig.openFireServiceName;
                                });
                                this.chatService.kickOutMembers(this.chatRoom.roomName, members);
                                this.chatService.leaveChatRoom(this.chatRoom.roomName);
                                this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
                                    chatItems.forEach(chatItem => {
                                        if (chatItem.accountName == this.chatRoom.roomName) {
                                            chatItems.remove(chatItems.indexOf(chatItem));
                                        }
                                    })
                                    this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems);
                                })
                                this.nativeService.showToast("退出成功，请稍后重试！");
                                this.navCtrl.popTo(this.navCtrl.getViews()[pages - 3]);
                            } else {
                                this.nativeService.showToast("退出失败，请稍后重试！");
                            }
                        }
                    );
                } else {
                    let chatRoomSubmit = this.buildChatRoomForSubmit([CompanyServiceProvider.getLoginCompany()]);
                    this.chatService.removeChatRoomMembers(chatRoomSubmit).then(
                        result => {
                            if (result.result == 'SUCCESS') {
                                //返回前两页
                                let pages = this.navCtrl.getViews().length;
                                this.navCtrl.popTo(this.navCtrl.getViews()[pages - 3]);
                                this.chatService.leaveChatRoom(this.chatRoom.roomName);
                            } else {
                                this.nativeService.showToast("退出失败，请稍后重试！");
                            }
                        }
                    )
                }
            }
        ).catch(e => {

        })

    }

    /**
     * 修改头像
     */
    changeAvatarImg() {
        this.nativeService.getPhoto().subscribe(
            data => {
                this.fileService.uploadFile(data).then(
                    response => {
                        if (response.result == 'SUCCESS') {
                            this.chatService.updateGroupAvatarImage(this.chatRoom.roomName, response.data)
                        } else {
                            this.nativeService.showToast("图片处理失败，请稍后再试！");
                        }
                    }
                )
            }
        )
    }
}
