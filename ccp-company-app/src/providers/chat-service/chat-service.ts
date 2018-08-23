import {Injectable} from '@angular/core';
import {AppConfig} from "../../app/AppConfig";
import {NativeServiceProvider} from "../native-service/native-service";
import {PageQuery} from "../../common/PageQuery";
import {HttpService} from "../HttpService";
import {Storage} from "@ionic/storage";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AlertController, Events} from "ionic-angular";
import {CustomerServiceProvider} from "../customer-service/customer-service";
import {CompanyServiceProvider} from "../company-service/company-service";
import {ChatItem} from "../../domain/ChatItem";
import {CHAT_ITEM, INIT_DATA} from "../../app/Constants";

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider extends HttpService {
    private _connected: boolean = false;//是否连接

    // private connection: any;

    private userName: string;
    // private password: string;

    private classes = [];

    /**
     * 判断是否处于聊天界面
     * @type {string}
     * @private
     */
    private _chatting = "";

    constructor(public http: HttpClient, public events: Events, public alertCtrl: AlertController, public storage: Storage, private nativeService: NativeServiceProvider) {
        super(http, alertCtrl);
    }


    connect(userName, password) {
        if (!this._connected) {
            this.userName = userName;
            userName = userName + AppConfig.openFireServiceName;
            setOnConnectCallBack(status => {

                console.info(status);
                if (status == Strophe.Status.CONNFAIL) {

                } else if (status == Strophe.Status.AUTHFAIL) {

                } else if (status == Strophe.Status.DISCONNECTED) {
                    this._connected = false;
                    // this.connect(userName, password);
                } else if (status == Strophe.Status.CONNECTED) {
                    this._connected = true;
                    this.registerChatRooms();
                }
            });

            connect(userName, password);
            setOnNewMessage((msg, event) => {
                if (event == "message") {
                    console.log('log');
                    let myself = msg.from == this.userName;
                    this.pushMessage(msg, myself);
                    if (!myself && !this.nativeService.isMobile()) {
                        this.playTone();
                    }
                } else if (event == "out") {
                    this.pushEvent(msg, event);
                }

            });
        }
    }

    playTone() {
        //非IE内核浏览器
        let audio: any = document.getElementById("audioPlay");
        //浏览器支持 audion
        audio.play();
    }

    joinInChatRoom(roomName) {
        roomName = roomName + AppConfig.openFireChatRoomServiceName;
        joinChatRoom(roomName);
    }

    multipleInvitesToChatRoom(roomName, members: any[]) {
        roomName = roomName + AppConfig.openFireChatRoomServiceName;
        multipleInvites(roomName, members)
    }

    kickOutMembers(roomName, receivers) {
        roomName = roomName + AppConfig.openFireChatRoomServiceName;
        kickOut(roomName, receivers);
    }

    /**
     * 主动离开群聊
     * @param roomName
     */
    leaveChatRoom(roomName) {
        // leave(roomName);
        roomName = roomName + AppConfig.openFireChatRoomServiceName;
        let receivers = [];
        receivers.push(this.userName + AppConfig.openFireServiceName);
        kickOut(roomName, receivers);
    }

    sendMessage(message, to) {
        sendMsg(message, to + AppConfig.openFireServiceName, "chat");
        let msg = {
            from: this.userName,
            to: to,
            type: "chat",
            msg: message,
            group: false
        };
        this.pushMessage(msg, true);
    }

    sendGroupMessage(message, to) {
        to = to + AppConfig.openFireChatRoomServiceName;
        sendMsg(message, to, "groupchat");
    }

    sendNotification(message, to) {
        to = to + AppConfig.openFireChatRoomServiceName;
        sendMsg(message, to, "notice");
    }

    disconnectServer() {
        disconnect();
    }

    registerEvent(handler: MessageHandler) {
        if (handler) {
            this.classes.push(handler);
        }
    }

    unRegisterEvent(handler: MessageHandler) {
        let index = this.classes.indexOf(handler);
        this.classes.splice(index);
    }

    pushMessage(msg, myself) {
        this.classes.forEach(handler => {
            handler.onMessage(msg, myself);
        })
    }

    pushEvent(msg, event) {
        this.classes.forEach(handler => {
            handler.onEvent(msg, event);
        })
    }

    registerChatRooms() {
        // this.joinInChatRoom('152179284653093');
        // // //查询聊天记录
        // this.storage.get('chatItems'+CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
        //     if (chatItems != null) {
        //         chatItems.forEach(chatItem => {
        //             if (chatItem.friendOfAccount == '152179284653093') {
        //                 chatItem.chatLogList=[]
        //             }
        //         })
        //     }
        // });
        this.getUserChatRooms().then(
            chatRooms => {
                this.storage.get(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName).then(chatItems => {
                    chatRooms.forEach(chatRoom => {
                        this.joinInChatRoom(chatRoom.group.roomName);
                        let isFind: boolean = false;
                        if (chatItems) {
                            chatItems.forEach(chatItem => {
                                if (chatItem.friendOfAccount == chatRoom.group.roomName) {
                                    // chatItem.chatLogList = []
                                    isFind = true;
                                }
                            })
                            if (!isFind) {
                                let chatItem = new ChatItem;
                                chatItem.lastTime = null;
                                chatItem.group = true;
                                chatItem.lastMessage = '';
                                chatItem.avatarImage = chatRoom.group.avatarImg;
                                chatItem.friendOfAccount = chatRoom.group.roomName;
                                chatItem.friendName = chatRoom.group.groupName;
                                chatItem.chatRoom = chatRoom.group;
                                chatItem.chatRoom.manager = chatRoom.manager;
                                chatItem.chatLogList=[];
                                chatItems.push(chatItem)
                            }
                        }
                        if (!chatItems) {
                            chatItems = [];
                            let chatItem = new ChatItem;
                            chatItem.lastTime = null;
                            chatItem.group = true;
                            chatItem.lastMessage = '';
                            chatItem.avatarImage = chatRoom.group.avatarImg;
                            chatItem.friendOfAccount = chatRoom.group.roomName;
                            chatItem.friendName = chatRoom.group.groupName;
                            chatItem.chatRoom = chatRoom.group;
                            chatItem.chatRoom.manager = chatRoom.manager;
                            chatItem.chatLogList=[];
                            chatItems.push(chatItem)
                        }
                        this.storage.set(CHAT_ITEM + CompanyServiceProvider.getLoginCompany().accountName, chatItems)
                    });
                });
            }
        )
        this.events.publish(INIT_DATA);
    }


    pageChatLogs(pageQuery: PageQuery): Promise<any> {
        return this.post('/chat/pageChatLogs.do', pageQuery.toJsonString());
    }

    pageGroupChatLogs(pageQuery: PageQuery): Promise<any> {
        return this.post('/chat/pageGroupChatLogs.do', pageQuery.toJsonString());
    }

    getLastContact(sender: string): Promise<any> {
        const params = new HttpParams().set("sender", sender);
        return this.get('/chat/getLastContacts.do', params);
    }

    getUserChatRooms(): Promise<any> {
        const params = new HttpParams().set('accountName', CompanyServiceProvider.getLoginCompany().accountName);
        return this.get('/chat/getUserChatRooms.do', params);
    }

    getGroupByRoomName(roomName: string): Promise<any> {
        const params = new HttpParams().set("roomName", roomName);
        return this.get('/chat/getGroupByRoomName.do', params);
    }

    createChatRoom(chatRoom): Promise<any> {
        let body = JSON.stringify(chatRoom);
        return this.post('/chat/createChatRoom.do', body, true);
    }

    addMemberToChatRoom(chatRoom): Promise<any> {
        let body = JSON.stringify(chatRoom);
        return this.post('/chat/addMemberToChatRoom.do', body, true);
    }

    removeChatRoomMembers(chatRoom): Promise<any> {
        let body = JSON.stringify(chatRoom);
        return this.post('/chat/removeChatRoomMembers.do', body, true);
    }

    updateGroupNameOrDescribe(chatRoom): Promise<any> {
        let body = JSON.stringify(chatRoom);
        return this.post('/chat/updateGroupNameOrDescribe.do', body, true);
    }

    deleteChatRoom(roomName,creator): Promise<any> {
        const params = new HttpParams().set("roomName", roomName).set("creator", creator);
        return this.delete('/chat/deleteChatRoom.do', params);
    }

    updateGroupAvatarImage(roomName, data): Promise<any> {
        const params = new HttpParams().set("roomName", roomName).set("avatarImage", data.filePath);
        return this.get('/chat/updateGroupAvatarImage.do', params);
    }

    /**
     * 根据usercode或者roomName获取chatItem
     * @param code
     * @param group
     * @returns {Promise<any>}
     */
    getChatItemByCode(code, group) {
        const params = new HttpParams().set("code", code).set("group", group);
        return this.get('/chat/getChatItemByCode.do', params);
    }

    createChatRoomAuto(naturalName, description, creator, staffs): Promise<any> {
        let chatRoom = {
            naturalName: naturalName,
            description: description,
            creator: creator
        };
        //staffs
        chatRoom["staffs"] = staffs;
        let members = [];
        staffs.forEach(
            staff => {
                //StaffSession.getOfAccount(staff.userCode)
                members.push(CustomerServiceProvider.getLoginCustomer().accountName + AppConfig.openFireServiceName);
            });
        //of账号数组
        chatRoom["members"] = members;
        return this.createChatRoom(chatRoom).then(
            result => {
                if (result.result == "SUCCESS") {
                    this.nativeService.showToast("添加成功！");
                    this.joinInChatRoom(result.data.roomName);
                    this.multipleInvitesToChatRoom(result.data.roomName, members);
                    return Promise.resolve(result.data.roomName);
                } else {
                    this.nativeService.showToast(result.message);
                    return Promise.reject(result.message);
                }
            },
        );


    }

    /**
     * 当前正在聊天的对象
     * @returns {string}
     */
    get chatting(): string {
        return this._chatting;
    }

    set chatting(value: string) {
        this._chatting = value;
    }
}

/**
 * 新消息到达分发
 */
export interface MessageHandler {

    onMessage(msg, myself);

    onEvent(msg, event);
}

export class Notice {
    type: string;
    data: string;
}
