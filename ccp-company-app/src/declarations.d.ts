/*
 Declaration files are how the Typescript compiler knows about the type information(or shape) of an object.
 They're what make intellisense work and make Typescript know all about your code.

 A wildcard module is declared below to allow third party libraries to be used in an app even if they don't
 provide their own type declarations.

 To learn more about using third party libraries in an Ionic app, check out the docs here:
 http://ionicframework.com/docs/v2/resources/third-party-libs/

 For more info on type definition files, check out the Typescript docs here:
 https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
 */
declare module '*';

/*chat.js*/
declare var Strophe:any;
declare var BOSH_SERVICE:any;
declare function connect(userName, password);
declare function joinChatRoom(roomJid);
declare function sendMsg(msg, to, type);
declare function setOnNewMessage(onNewMessage1);
declare function setOnConnectCallBack(onNewMessage1);
declare function disconnect();
declare function multipleInvites(room, receivers);
declare function kickOut(room, receivers);
declare function leave(room);


declare var echarts:any;

declare var cordova;


