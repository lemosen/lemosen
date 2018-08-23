// XMPP服务器BOSH地址
var BOSH_SERVICE = 'http://192.168.0.168:7070/http-bind';

// XMPP连接
var connection = null;

// 当前状态是否连接
var connected = false;

// 当前登录的JID
var jid = "";
var pwd = "";
var reconnect = false;

//新消息回调
var onNewMessage;

//连接状态回调
var onConnectCallBack;

// 连接状态改变的事件
function onConnect(status) {
        if (onConnectCallBack) {
                onConnectCallBack(status);
        }

        if (status === Strophe.Status.CONNFAIL) {
                console.info("连接失败！");
        } else if (status === Strophe.Status.AUTHFAIL) {
                console.info("登录失败！");
        } else if (status === Strophe.Status.DISCONNECTED) {
                console.info("连接断开！");
                connected = false;
                if (reconnect) {
                        connect(jid, pwd);
                }
        } else if (status === Strophe.Status.CONNECTED) {
                console.info("连接成功，可以开始聊天了！");
                connected = true;

                // 当接收到<message>节，调用onMessage回调函数
                connection.addHandler(onMessage, null, 'message', null, null, null);

                // 首先要发送一个<presence>给服务器（initial presence）
                connection.send($pres().tree());
        }
}

function setOnNewMessage(onNewMessage1) {
        onNewMessage = onNewMessage1;
}

function setOnConnectCallBack(onConnectCallBack1) {
        onConnectCallBack = onConnectCallBack1;
}

// 接收到<message>
function onMessage(msg) {
        console.info(msg);
        // 解析出<message>的from、type属性，以及body子元素
        var type = msg.getAttribute('type');
        var from = msg.getAttribute('from');
        var id = '';
        var roomName;
        var group;
        //解析出<delay>stamp属性
        var delay = msg.getElementsByTagName('delay');
        var stamp = new Date()
        if (delay.length > 0) {
                stamp = delay[0].getAttribute('stamp');
        }
        if (type === "groupchat") {
                roomName = from.split("@")[0];
                from = from.split("/")[1];
                group = true;

        } else if (type === "chat") {
                from = from.split("@")[0];
                group = false;
                id =msg.getAttribute('id');
        }
        var elems = msg.getElementsByTagName('body');
        if ((type === "chat" || type === "groupchat") && elems.length > 0) {
                var body = elems[0];
                console.info(body);
                var msg = Strophe.getText(body);
                msg = escape2Html(msg);
                var msgNew = {
                        "msg": msg,
                        "from": from,
                        "type": type,
                        "group": group,
                        "roomName": roomName,
                        "stamp": stamp,
                        "id":id,
                };
                messageCallBack(msgNew, 'message');
        }
        //不属于聊天消息
        else if (!type) {
                var event = msg.getAttribute('event');
                var jid = msg.getAttribute('jid');
                if (event === "invite") {
                        //群组邀请
                        console.info("邀请加入群组" + jid);
                        joinChatRoom(jid);
                } else if (event === "out") {
                        //群组解散
                        console.info("群组解散" + jid);
                        leave(jid);
                        var msgGroup = {
                                "roomName": jid.split("@")[0]
                        };
                        messageCallBack(msgGroup, 'out');
                }
        }

        return true;
}

function escape2Html(str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                return arrEntities[t];
        });
}

/**
 * 消息回调
 * @param msg
 * @param event
 */
function messageCallBack(msg, event) {
        if (onNewMessage) {
                onNewMessage(msg, event);
        }
}

function connect(userName, password) {
        console.info(userName, password);
        jid = userName;
        pwd = password;
        if (connected) {
                connection.disconnect();
                reconnect = true;
        } else {
                connection = new Strophe.Connection(BOSH_SERVICE);
                connection.connect(userName, password, onConnect);
                reconnect = false;
        }
}

function sendMsg(msg, to, type) {
        var msgBody = $msg({
                to: to,
                from: jid,
                type: type
        }).c("body", null, msg).c('x', {xmlns: 'jabber:x:event'});
        connection.send(msgBody.tree());
}

function disconnect() {
        if (connected) {
                connection.disconnect();
        }
}

/**
 * 注册加入房间，才能收到群聊消息
 * @param roomJid
 */
function joinChatRoom(roomJid) {
        console.info(roomJid);
        connection.send($pres({
                from: jid,
                to: roomJid + "/" + jid.substring(0, jid.indexOf("@"))
        }).c('x', {xmlns: 'http://jabber.org/protocol/muc'}).tree());
}

/**
 * 退出房间
 * @param roomJid
 */
function exitChatRoom(roomJid) {
        console.info(roomJid);
        connection.send($pres({
                from: jid,
                to: roomJid + "/" + jid.substring(0, jid.indexOf("@"))
        }).c('x', {xmlns: 'http://jabber.org/protocol/muc'}).tree());
}

/**
 * 多人邀请
 * @param room
 * @param receivers
 */
function multipleInvites(room, receivers) {
        var data = {
                data: room,
                type: "invite"
        };
        receivers.forEach(function (receive) {
                directInvite(room, receive);
        });
}

/**
 * 踢出房间
 * @param room
 * @param receivers
 */
function kickOut(room, receivers) {
        receivers.forEach(function (receive) {
                sendKickOut(room, receive);
        });
}

/**
 * 离开房间
 * @param room
 */
function leave(room) {
        var presence = $pres({
                type: "unavailable",
                from: jid,
                to: room
        });
        connection.send(presence);
}

/**
 * 邀请加入房间
 * @param room
 * @param receiver
 * @returns {*}
 */
function directInvite(room, receiver) {
        var attrs, invitation, msgid;
        msgid = connection.getUniqueId();
        attrs = {
                xmlns: 'jabber:x:conference',
                jid: room
        };
        invitation = $msg({
                from: jid,
                to: receiver,
                id: msgid,
                jid: room,
                event: "invite"
        }).c('x', attrs);
        connection.send(invitation);
        return msgid;
}

/**
 * 解散群组，通知退出聊天室
 * @param room
 * @param receiver
 * @returns {*}
 */
function sendKickOut(room, receiver) {
        var attrs, invitation, msgid;
        msgid = connection.getUniqueId();
        attrs = {
                xmlns: 'jabber:x:conference',
                jid: room
        };
        invitation = $msg({
                from: jid,
                to: receiver,
                id: msgid,
                jid: room,
                event: "out"
        }).c('x', attrs);
        connection.send(invitation);
        return msgid;
}