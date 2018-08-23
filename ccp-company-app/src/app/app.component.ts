import {Component} from '@angular/core';
import {App, Config, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {TranslateService} from "@ngx-translate/core";
import {NativeServiceProvider} from "../providers/native-service/native-service";
import {ChatServiceProvider} from "../providers/chat-service/chat-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(private app: App, private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,private chatService:ChatServiceProvider,
              private translate: TranslateService, private config: Config, private ionicApp: IonicApp,private nativeService:NativeServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();

  }

    initTranslate() {
        //添加语言支持
        this.translate.addLangs(['zh-CN', 'en']);
        //设置默认语言，一般在无法匹配的时候使用
        this.translate.setDefaultLang('zh-CN');
        // Set the default language for translation strings, and the current language.
        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('zh-CN'); // Set your language here
        }
        // if(this.nativeService.isIos()){
        //     this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
        //         this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        //     });
        // }

    }
}
