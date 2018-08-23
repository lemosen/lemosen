import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {DesignerSkillLevelForm} from "../../form/DesignerSkillLevelForm";
import {FormBuilder, Validators} from "@angular/forms";
import {Skill} from "../../domain/Skill";
import {SkillLevel} from "../../domain/SkillLevel";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the AddCustomerSkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@
    Component({
    selector: 'page-add-customer-skill',
    templateUrl: 'add-customer-skill.html',
})
export class AddCustomerSkillPage extends FormPage {


    skills: Skill[] = [];
    selectSkill: Skill = new Skill;
    selectLevel: SkillLevel = new SkillLevel;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, private fb: FormBuilder, public navParams: NavParams, public skillServiceProvider: SkillServiceProvider) {
        super();
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            customerId: [CompanyServiceProvider.getLoginCompany().companyId],
            skillId: ['', Validators.required],
            levelIds: [[], Validators.required],
            applyInfo: ['', Validators.compose([Validators.required, Validators.maxLength(1024)])]
        });
        this.skillServiceProvider.toAddDesignerSkillLevel().then(data => {
            if (data != null && data.length != 0) {
                this.skills = this.sortByObjId(data,'sortOrder',true);
                this.skills.forEach(skill=>{
                    skill.skillLevels=this.sortByObjId(skill.skillLevels,'sortOrder',true);
                })
                this.skills = data;
                this.skills[0].check = true;
                this.selectSkill = this.skills[0];
                this.selectLevel = this.selectSkill.skillLevels[0];
                let levelIds = [];
                levelIds.push(this.selectLevel.levelId);
                this.formGroup.patchValue({
                    skillId: this.selectSkill.skillId,
                    levelIds: levelIds
                })
            }
        })

    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let designerSkillLevelForm: DesignerSkillLevelForm = this.formGroup.value;
            this.skillServiceProvider.saveCustomerSkillLevel(designerSkillLevelForm).then(data => {
                if (data == 'success') {
                    this.navCtrl.pop();
                    this.toastCtrl.create({message: '申请成功', duration: 1000}).present();
                    this.submitted = false;
                }
            }, error => {
                this.toastCtrl.create({message: error.error, duration: 1000}).present();
                this.submitted = false;
            })
        }
    }

    selectFormSkill() {
        let alert = this.alertCtrl.create({
            title: '请选择技能',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    console.log(data)
                    this.skills.forEach(skill => skill.check = false);
                    let skills = this.skills.filter(skill => data == skill.skillId);
                    skills[0].check = true;
                    this.selectSkill = skills[0];
                    this.selectLevel = this.selectSkill.skillLevels[0];
                    let levelIds = [];
                    levelIds.push(this.selectLevel.levelId);
                    this.formGroup.patchValue({
                        skillId: data,
                        levelIds: levelIds
                    })
                }
            }],
        });
        for (let item of this.skills) {
            if (item.check) {
                alert.addInput({
                    label: item.skillName,
                    type: 'radio',
                    checked: true,
                    value: item.skillId.toString()
                });
            } else {
                alert.addInput({
                    label: item.skillName,
                    type: 'radio',
                    value: item.skillId.toString()
                });
            }
        }
        alert.present()
    }

    selectFormSkillLevel() {
        let skill: Skill = this.skills.filter(skill => skill.skillId == this.selectSkill.skillId)[0];
        let skillLevels = skill.skillLevels;
        let alert = this.alertCtrl.create({
            title: '请选择技能等级',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    console.log(data)
                    let levelIds = [];
                    levelIds.push(data);
                    this.selectLevel = skillLevels.filter(skill => data == skill.levelId)[0];
                    this.formGroup.patchValue({
                        levelIds: levelIds
                    })
                }
            }],
        });
        for (let item of skillLevels) {
            if (item.levelId == this.formGroup.value.levelIds[0]) {
                alert.addInput({
                    label: item.levelName,
                    type: 'radio',
                    checked: true,
                    value: item.levelId.toString()
                });
            } else {
                alert.addInput({
                    label: item.levelName,
                    type: 'radio',
                    value: item.levelId.toString()
                });
            }
        }
        alert.present()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddCustomerSkillPage');
    }

}
