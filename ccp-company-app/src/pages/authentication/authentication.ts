import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {FormPage} from "../../common/formPage";
import {NativeServiceProvider} from "../../providers/native-service/native-service";
import {FileServiceProvider} from "../../providers/file-service/file-service";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {CompanyAuthForm} from "../../form/CompanyAuthForm";

/**
 * Generated class for the AuthenticationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-authentication',
    templateUrl: 'authentication.html',
})
export class AuthenticationPage extends FormPage {
    companyScope: any[] = [{
        itemLabel: "铁路运输设备制造及金属制品加工",
        itemValue: "MANUFACTURINGOFRAILWAYEQUIPMENT",
        check: false
    }, {
        itemLabel: "市轨道交通装备及其零部件的研发",
        itemValue: "RESEARCHOFURBANRAILEQUIPMENT",
        check: false
    }, {
        itemLabel: "铁路机车、客车、城市轨道交通设备的设计",
        itemValue: "DESIGNOFRAILWAYBUSEQUIPMENT",
        check: false
    }, {
        itemLabel: "机车车辆、城市轨道车辆及配件研发、设计",
        itemValue: "URBANRAILVEHICLEANDACCESSORIES",
        check: false
    }];
    gender: any[] = [{
        itemLabel: "男",
        itemValue: "true",
        check: false
    }, {
        itemLabel: "女",
        itemValue: "false",
        check: false
    }];
    imgUrl: string = AppConfig.imgUrl;

    constructor(public fileServiceProvider: FileServiceProvider,public alertCtrl: AlertController, public nativeServiceProvider: NativeServiceProvider, public navCtrl: NavController, public toastCtrl: ToastController,
                public navParams: NavParams, public companyServiceProvider: CompanyServiceProvider, private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        console.log(CompanyServiceProvider.getLoginCompany())
        this.formGroup = this.fb.group({
            companyName: [CompanyServiceProvider.getLoginCompany().companyName, Validators.compose([Validators.required, Validators.maxLength(32)])],
            companyId: [CompanyServiceProvider.getLoginCompany().companyId],
            masterName: [CompanyServiceProvider.getLoginCompany().masterName, Validators.required],
            legalImg: [CompanyServiceProvider.getLoginCompany().legalImg],
            licenseCode: [CompanyServiceProvider.getLoginCompany().licenseCode, Validators.compose([Validators.required])],
            licenseAddress: [CompanyServiceProvider.getLoginCompany().licenseAddress, Validators.compose([Validators.required])],
            licenseImg: [CompanyServiceProvider.getLoginCompany().licenseImg, Validators.compose([Validators.required])],
            companyAddress: [CompanyServiceProvider.getLoginCompany().companyAddress, Validators.compose([Validators.required])],
            companyScope: [CompanyServiceProvider.getLoginCompany().companyScope, Validators.compose([Validators.required])]
        })

    };

    uploadLegalImg() {
        this.nativeServiceProvider.getPhoto().subscribe(data => {
            this.fileServiceProvider.uploadFile(data,"/file/uploadLegalImg.do").then(data => {
                if (data.result == 'SUCCESS') {
                    this.formGroup.patchValue({
                        legalImg: data.data
                    });
                    this.toastCtrl.create({message: '上传成功', duration: 1000}).present();
                } else {
                    this.toastCtrl.create({message: '上传失败', duration: 1000}).present();
                }
            })
        })
    }

    uploadLicenseImg() {
        this.nativeServiceProvider.getPhoto().subscribe(data => {
            this.fileServiceProvider.uploadFile(data,"/file/uploadLicenseImg.do").then(data => {
                if (data.result == 'SUCCESS') {
                    this.formGroup.patchValue({
                        licenseImg: data.data
                    });
                    this.toastCtrl.create({message: '上传成功', duration: 1000}).present();
                } else {
                    this.toastCtrl.create({message: '上传失败', duration: 1000}).present();
                }
            })
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthenticationPage');
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let companyAuthForm: CompanyAuthForm = this.formGroup.value;
            this.companyServiceProvider.examine(companyAuthForm).then(data => {
                    if (data.customerId != 0) {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '修改成功', duration: 1000}).present();
                        this.companyServiceProvider.setLoginCompany(data)
                        this.submitted = false;
                    }
                },
                error => {
                    this.toastCtrl.create({message: '修改失败', duration: 1000}).present();
                    this.submitted = false;
                })
        }
    }

    presentEducation() {
        let alert = this.alertCtrl.create({
            title: '请选择经营范围',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    this.formGroup.patchValue({companyScope: data})
                }
            }],
        });
        for (let item of this.companyScope) {
            if (item.check) {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    checked: true,
                    value: item.itemValue
                });
            } else {
                alert.addInput({
                    label: item.itemLabel,
                    type: 'radio',
                    value: item.itemValue
                });
            }
        }
        alert.present()
    }

}
