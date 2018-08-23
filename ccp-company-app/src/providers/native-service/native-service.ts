// /**
//  * Created by yanxiaojun617@163.com on 12-27.
//  */
// import {Injectable} from "@angular/core";
// import {
//     ActionSheetController, AlertController, Loading, LoadingController, Platform, Toast,
//     ToastController
// } from "ionic-angular";
// import {StatusBar} from "@ionic-native/status-bar";
// import {SplashScreen} from "@ionic-native/splash-screen";
//
// import {File, FileEntry} from "@ionic-native/file";
// import {FileTransferObject} from "@ionic-native/file-transfer";
// import {InAppBrowser} from "@ionic-native/in-app-browser";
// import {ImagePicker} from "@ionic-native/image-picker";
// import {Network} from "@ionic-native/network";
// import {AppMinimize} from "@ionic-native/app-minimize";
// // import {IMAGE_SIZE, QUALITY_SIZE, REQUEST_TIMEOUT} from "./Constants";
// // import {GlobalData} from "./GlobalData";
// import {Observable} from "rxjs";
// // import {Logger} from "./Logger";
// import {FileOpener} from "@ionic-native/file-opener";


import {Injectable} from "@angular/core";
import {ActionSheetController, AlertController, Loading, LoadingController, Platform, ToastController} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Observable} from "rxjs/Observable";
import {FileOpener} from "@ionic-native/file-opener";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File, FileEntry} from "@ionic-native/file";
import {ImagePicker} from "@ionic-native/image-picker";

@Injectable()
export class NativeServiceProvider {
    private loading: Loading;
    private loadingIsOpen: boolean = false;

    constructor(private platform: Platform,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                // private appVersion: AppVersion,
                private camera: Camera,
                // private toast: Toast,
                private file: File,
                // private inAppBrowser: InAppBrowser,
                private imagePicker: ImagePicker,
                // private network: Network,
                // private appMinimize: AppMinimize,
                private loadingCtrl: LoadingController,
                // private globalData: GlobalData,
                private fileOpener: FileOpener,
                // public logger: Logger,
                private actionSheetCtrl: ActionSheetController,
    ) {
    }


    /**
     * 使用默认状态栏
     */
    statusBarStyleDefault(): void {
        this.statusBar.styleDefault();
    }

    /**
     * 隐藏启动页面
     */
    splashScreenHide(): void {
        this.splashScreen.hide();
    }

    /**
     * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     */
    getNetworkType(): string {
        if (!this.isMobile()) {
            return 'wifi';
        }
        // return this.network.type;
    }

    /**
     * 判断是否有网络
     */
    isConnecting(): boolean {
        return this.getNetworkType() != 'none';
    }

    /**
     * 调用最小化app插件
     */
    minimize(): void {
        // this.appMinimize.minimize()
    }

    /**
     * 通过浏览器打开url
     */
    openUrlByBrowser(url: string): void {
        // this.inAppBrowser.create(url, '_system');
    }

    // /**
    //  * 下载安装app
    //  */
    // downloadApp(): void {
    //     if (this.isIos()) {//ios打开网页下载
    //         this.openUrlByBrowser(APP_DOWNLOAD);
    //     }
    //     if (this.isAndroid()) {//android本地下载
    //         let backgroundProcess = false;//是否后台下载
    //         let alert = this.alertCtrl.create({//显示下载进度
    //             title: '下载进度：0%',
    //             enableBackdropDismiss: false,
    //             buttons: [{
    //                 text: '后台下载', handler: () => {
    //                     backgroundProcess = true;
    //                 }
    //             }
    //             ]
    //         });
    //         alert.present();
    //
    //         const fileTransfer: FileTransferObject = this.transfer.create();
    //         const apk = this.file.externalRootDirectory + `android_${Utils.getSequence()}.apk`; //apk保存的目录
    //
    //         //下载并安装apk
    //         fileTransfer.download(APK_DOWNLOAD, apk).then(() => {
    //             window['install'].install(apk.replace('file://', ''));
    //         }, err => {
    //             alert.dismiss();
    //             this.logger.log(err, 'android app 本地升级失败');
    //             this.alertCtrl.create({
    //                 title: '前往网页下载',
    //                 subTitle: '本地升级失败',
    //                 buttons: [
    //                     {
    //                         text: '确定',
    //                         handler: () => {
    //                             this.openUrlByBrowser(APP_DOWNLOAD);//打开网页下载
    //                         }
    //                     }
    //                 ]
    //             }).present();
    //         });
    //
    //         let timer = null;//由于onProgress事件调用非常频繁,所以使用setTimeout用于函数节流
    //         fileTransfer.onProgress((event: ProgressEvent) => {
    //             let progress = Math.floor(event.loaded / event.total * 100);//下载进度
    //             this.globalData.updateProgress = progress;
    //             if (!backgroundProcess) {
    //                 if (progress === 100) {
    //                     alert.dismiss();
    //                 } else {
    //                     if (!timer) {
    //                         timer = setTimeout(() => {
    //                             clearTimeout(timer);
    //                             timer = null;
    //                             let title = document.getElementsByClassName('alert-title')[0];
    //                             title && (title.innerHTML = `下载进度：${progress}%`);
    //                         }, 1000);
    //                     }
    //                 }
    //             }
    //         });
    //     }
    // }

    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }

    alert(title: string, subTitle: string = ""): void {
        this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [{text: '确定'}]
        }).present();
    }

    alertConfirm(title: string, subTitle: string = "", inputs: Array<any> = []): Promise<any> {
        return new Promise((resolve, reject) => {
            let prompt = this.alertCtrl.create({
                title: title,
                subTitle: subTitle,
                inputs: inputs,
                buttons: [
                    {
                        text: '取消', handler: data => {
                        reject(data);
                    }
                    },
                    {
                        text: '确定', handler: data => {
                        resolve(data);
                    }
                    }
                ]
            });
            prompt.present();
        });

    }

    // alert(title: string, subTitle: string = "",): void {
    //     this.alertCtrl.create({
    //         title: title,
    //         subTitle: subTitle,
    //         buttons: [{text: '确定'}]
    //     }).present();
    // }

    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */
    showToast(message: string = '操作完成', duration: number = 2000): void {
        if (this.isMobile()) {
            // this.toast.show(message, String(duration), 'center').subscribe();
        } else {
            this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'middle',
                showCloseButton: false
            }).present();
        }
    };

    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    showLoading(content: string = ''): void {
        // if (!this.globalData.showLoading) {
        //     return;
        // }
        // if (!this.loadingIsOpen) {
        //     this.loadingIsOpen = true;
        //     this.loading = this.loadingCtrl.create({
        //         content: content
        //     });
        //     this.loading.present();
        //     setTimeout(() => {
        //         this.loadingIsOpen && this.loading.dismiss();
        //         this.loadingIsOpen = false;
        //     }, REQUEST_TIMEOUT);
        // }
    };

    /**
     * 关闭loading
     */
    hideLoading(): void {
        // if (!this.globalData.showLoading) {
        //     this.globalData.showLoading = true;
        // }
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
    };


    /**
     * 使用cordova-plugin-camera获取照片
     * @param options
     */
    getPicture(options: CameraOptions = {}): Observable<string> {
        let ops: CameraOptions = Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
            destinationType: this.camera.DestinationType.FILE_URI,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
            // quality: QUALITY_SIZE,//图像质量，范围为0 - 100
            allowEdit: false,//选择图片前是否允许编辑
            encodingType: this.camera.EncodingType.JPEG,
            // targetWidth: IMAGE_SIZE,//缩放图像的宽度（像素）
            // targetHeight: IMAGE_SIZE,//缩放图像的高度（像素）
            saveToPhotoAlbum: false,//是否保存到相册
            correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
        }, options);
        return Observable.create(observer => {
            this.camera.getPicture(ops).then((imgData: string) => {
                if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
                    observer.next('data:image/jpg;base64,' + imgData);
                } else {
                    observer.next(imgData);
                }
            }).catch(err => {
                if (err == 20) {
                    this.alert('没有权限,请在设置中开启权限');
                    return;
                }
                if (String(err).indexOf('cancel') != -1) {
                    return;
                }
                // this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
                this.alert('获取照片失败');
            });
        });
    };

    /**
     * 通过拍照获取照片
     * @param options
     */
    getPictureByCamera(options: CameraOptions = {}): Observable<string> {
        let ops: CameraOptions = Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
        }, options);
        return this.getPicture(ops);
    };

    /**
     * 通过图库获取照片
     * @param options
     */
    getPictureByPhotoLibrary(options: CameraOptions = {}): Observable<string> {
        let ops: CameraOptions = Object.assign({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
        }, options);
        return this.getPicture(ops);
    };

    /**
     * 通过图库选择多图
     * @param options
     */
    getMultiplePicture(options = {}): Observable<any> {
        let that = this;
        let ops = Object.assign({
            maximumImagesCount: 6,
            // width: IMAGE_SIZE,//缩放图像的宽度（像素）
            // height: IMAGE_SIZE,//缩放图像的高度（像素）
            // quality: QUALITY_SIZE//图像质量，范围为0 - 100
        }, options);
        return Observable.create(observer => {
            this.imagePicker.getPictures(ops).then(files => {
                let destinationType = options['destinationType'] || 0;//0:base64字符串,1:图片url
                if (destinationType === 1) {
                    observer.next(files);
                } else {
                    let imgBase64s = [];//base64字符串数组
                    for (let fileUrl of files) {
                        that.convertImgToBase64(fileUrl).subscribe(base64 => {
                            imgBase64s.push(base64);
                            if (imgBase64s.length === files.length) {
                                observer.next(imgBase64s);
                            }
                        })
                    }
                }
            }).catch(err => {
                // this.logger.log(err, '通过图库选择多图失败');
                this.alert('获取照片失败');
            });
        });
    };

    getPhoto():Observable<string>{
        return Observable.create(observer => {

            let actionSheet = this.actionSheetCtrl.create({
                title: '',
                buttons: [
                    {
                        text: '拍照',
                        // role: 'destructive',
                        icon: 'camera',
                        handler: () => {
                            this.getPictureByCamera().subscribe(
                                data=>{
                                    observer.next(data);
                                },
                                error2 => {observer.complete()}

                            );
                        }
                    },{
                        text: '相册',
                        icon: 'image',
                        handler: () => {
                            this.getPictureByPhotoLibrary().subscribe(
                                data=> {
                                    this.showToast(data)
                                    observer.next(data);
                                },
                                error2 => {observer.complete()});
                        }
                    },{
                        text: '取消',
                        role: 'cancel',
                        handler: () => {
                            observer.complete();
                        }
                    }
                ]
            });
            actionSheet.present();
        });
    }


    /**
     * 根据图片绝对路径转化为base64字符串
     * @param path 绝对路径
     */
    convertImgToBase64(path: string): Observable<string> {
        return Observable.create(observer => {
            this.file.resolveLocalFilesystemUrl(path).then((fileEnter: FileEntry) => {
                fileEnter.file(file => {
                    let reader = new FileReader();
                    reader.onloadend = function (e) {
                        observer.next(this.result);
                    };
                    reader.readAsDataURL(file);
                });
            }).catch(err => {
                // this.logger.log(err, '根据图片绝对路径转化为base64字符串失败');
            });
        });
    }

    // /**
    //  * 获得app版本号,如0.01
    //  * @description  对应/config.xml中version的值
    //  */
    // getVersionNumber(): Observable<string> {
    //     return Observable.create(observer => {
    //         this.appVersion.getVersionNumber().then((value: string) => {
    //             observer.next(value);
    //         }).catch(err => {
    //             this.logger.log(err, '获得app版本号失败');
    //         });
    //     });
    // }
    //
    // /**
    //  * 获得app版本号,如1.01
    //  * @description  对应/config.xml中version的值
    //  * @returns {Promise<number>}
    //  */
    // getVersionNumber(): Promise<string> {
    //     return new Promise((resolve) => {
    //         this.appVersion.getVersionNumber().then((versionNumber: string) => {
    //             resolve(versionNumber);
    //         }).catch(err => {
    //             console.log('getVersionNumber:' + err);
    //         });
    //     });
    // }

    // /**
    //  * 获得app name,如现场作业
    //  * @description  对应/config.xml中name的值
    //  */
    // getAppName(): Observable<string> {
    //     return Observable.create(observer => {
    //         this.appVersion.getAppName().then((value: string) => {
    //             observer.next(value);
    //         }).catch(err => {
    //             // this.logger.log(err, '获得app name失败');
    //         });
    //     });
    // }

    // /**
    //  * 获得app包名/id,如com.kit.ionic2tabs
    //  * @description  对应/config.xml中id的值
    //  */
    // getPackageName(): Observable<string> {
    //     return Observable.create(observer => {
    //         this.appVersion.getPackageName().then((value: string) => {
    //             observer.next(value);
    //         }).catch(err => {
    //             // this.logger.log(err, '获得app包名失败');
    //         });
    //     });
    // }

    // /**
    //  * 检查app是否需要升级
    //  */
    detectionUpgrade(currentVersion: string) {
        // if (currentVersion) {
        //   // this.nativeService.showToast("版本是："+this.version);
        //   this.http.get(AppConfig.baseURL+AppConfig.hostDomain+'/app/update.json').subscribe(
        //     data => {
        //       // data as
        //       let latest_versionNumber: string = data.version;
        //       if (currentVersion != latest_versionNumber) {
        //         this.alertConfirm("发现新版本，是否更新？", "", null).then(
        //           ok => {
        //             this.downloadApp(data.url);
        //           }
        //         )
        //       } else {
        //         this.showToast("已经是最新版本了！");
        //       }
        //     }
        //   );
        // } else {
        //   this.showToast("获取app版本信息失败！");
        // }
    }

    // /**
    //  * 下载安装app
    //  */
    // downloadApp(apk_url: string) {
    //     if (this.isAndroid()) {
    //         let alert = this.alertCtrl.create({
    //             title: '下载进度：0%',
    //             enableBackdropDismiss: false,
    //             buttons: ['后台下载']
    //         });
    //         alert.present();
    //
    //         const fileTransfer: FileTransferObject = new FileTransferObject();
    //         const file: File = new File();
    //         const apk = file.externalRootDirectory + 'isee.apk'; //apk保存的目录
    //
    //         fileTransfer.download(apk_url, apk).then(() => {
    //             this.fileOpener.open(apk, 'application/vnd.android.package-archive').then(() => {
    //                 // file.removeFile(file.tempDirectory, 'yoursunion.apk');
    //             });
    //         });
    //
    //         fileTransfer.onProgress((event: ProgressEvent) => {
    //             let num = Math.floor(event.loaded / event.total * 100);
    //             if (num === 100) {
    //                 alert.dismiss();
    //                 this.showToast("下载成功！安装包保存在" + apk.replace('file://', ''), 3000);
    //             } else {
    //                 let title = document.getElementsByClassName('alert-title')[0];
    //                 title && (title.innerHTML = '下载进度：' + num + '%');
    //             }
    //         });
    //     }
    //
    //     if (this.isIos()) {
    //         this.openUrlByBrowser("");
    //     }
    // }
}

