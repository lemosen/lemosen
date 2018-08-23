import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CustomerCenterPage} from "../pages/customer-center/customer-center";
import {DemandListPage} from "../pages/demand-list/demand-list";
import {DemandServiceProvider} from '../providers/demand-service/demand-service';
import {ComponentsModule} from "../components/components.module";
import {CustomerServiceProvider} from '../providers/customer-service/customer-service';
import {BidServiceProvider} from '../providers/bid-service/bid-service';
import {ArbitrateServiceProvider} from '../providers/arbitrate-service/arbitrate-service';
import {ArticleChannelServiceProvider} from '../providers/article-channel-service/article-channel-service';
import {CompanyServiceProvider} from '../providers/company-service/company-service';
import {ContractServiceProvider} from '../providers/contract-service/contract-service';
import {CourseServiceProvider} from '../providers/course-service/course-service';
import {DebtPayableServiceProvider} from '../providers/debt-payable-service/debt-payable-service';
import {ExpertServiceProvider} from '../providers/expert-service/expert-service';
import {ExpServiceProvider} from '../providers/exp-service/exp-service';
import {LogServiceProvider} from '../providers/log-service/log-service';
import {MailServiceProvider} from '../providers/mail-service/mail-service';
import {NewsServiceProvider} from '../providers/news-service/news-service';
import {NotificationServiceProvider} from '../providers/notification-service/notification-service';
import {ProfileServiceProvider} from '../providers/profile-service/profile-service';
import {ScoreServiceProvider} from '../providers/score-service/score-service';
import {SkillServiceProvider} from '../providers/skill-service/skill-service';
import {SkillTaskServiceProvider} from '../providers/skill-task-service/skill-task-service';
import {SubtaskServiceProvider} from '../providers/subtask-service/subtask-service';
import {TopicServiceProvider} from '../providers/topic-service/topic-service';
import {TransactionServiceProvider} from '../providers/transaction-service/transaction-service';
import {WithdrawalApplyServiceProvider} from '../providers/withdrawal-apply-service/withdrawal-apply-service';
import {AppealServiceProvider} from '../providers/appeal-service/appeal-service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NativeServiceProvider} from "../providers/native-service/native-service";
import {FileServiceProvider} from '../providers/file-service/file-service';
import {FileTransfer} from "@ionic-native/file-transfer";
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {FileChooser} from "@ionic-native/file-chooser";
import {FileOpener} from "@ionic-native/file-opener";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {ChatServiceProvider} from '../providers/chat-service/chat-service';
import {WechatServiceProvider} from '../providers/wechat-service/wechat-service';
import {AppAvailability} from "@ionic-native/app-availability";
import {Alipay} from "@ionic-native/alipay";
import {PayServiceProvider} from '../providers/pay-service/pay-service';
import {PipesModule} from "../pipes/pipes.module";

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp,
        CustomerCenterPage,
        DemandListPage,
        ContactPage,
        HomePage,
        TabsPage,
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        HttpClientModule,
        PipesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            backButtonIcon: "ios-arrow-back",
            tabsHideOnSubPages: 'true',
            tabsPlacement: 'bottom',
            pageTransition: 'ios-transition',
            mode: 'ios'

        }),
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        CustomerCenterPage,
        DemandListPage,
        ContactPage,
        HomePage,
        TabsPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        File,
        FilePath,
        FileTransfer,
        ImagePicker,
        FileChooser,
        FileOpener,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DemandServiceProvider,
        CustomerServiceProvider,
        BidServiceProvider,
        ArbitrateServiceProvider,
        ArticleChannelServiceProvider,
        CompanyServiceProvider,
        ContractServiceProvider,
        CourseServiceProvider,
        DebtPayableServiceProvider,
        DemandServiceProvider,
        ExpertServiceProvider,
        ExpServiceProvider,
        LogServiceProvider,
        MailServiceProvider,
        NewsServiceProvider,
        NotificationServiceProvider,
        ProfileServiceProvider,
        ScoreServiceProvider,
        SkillServiceProvider,
        SkillTaskServiceProvider,
        SubtaskServiceProvider,
        TopicServiceProvider,
        TransactionServiceProvider,
        WithdrawalApplyServiceProvider,
        AppealServiceProvider,
        NativeServiceProvider,
        TranslateService,
        FileServiceProvider,
        ChatServiceProvider,
        AppAvailability,
        Alipay,
        PayServiceProvider,
    ]
})
export class AppModule {
}
