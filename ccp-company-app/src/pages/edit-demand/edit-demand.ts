import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DemandCategory} from "../../domain/DemandCategory";
import {SkillLevel} from "../../domain/SkillLevel";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";
import {FormBuilder, Validators} from "@angular/forms";
import {DemandServiceProvider} from "../../providers/demand-service/demand-service";
import {Skill} from "../../domain/Skill";
import {SkillServiceProvider} from "../../providers/skill-service/skill-service";
import {Demand} from "../../domain/Demand";
import {DemandState} from "../../domain/enums";

/**
 * Generated class for the EditDemandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-demand',
    templateUrl: 'edit-demand.html',
})
export class EditDemandPage extends FormPage {
    demandCategories: DemandCategory[] = [];
    skillLevels: SkillLevel[] = [];
    selectCategory: DemandCategory = new DemandCategory;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public skillServiceProvider: SkillServiceProvider, public companyServiceProvider: CompanyServiceProvider, public demandServiceProvider: DemandServiceProvider, private fb: FormBuilder,) {
        super();
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddDemandPage');
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            demandName: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(32)])],
            demandId: [this.navParams.get("demand").demandId, Validators.compose([Validators.required])],
            demandCategory: ['', Validators.compose([Validators.required])],
            skillLevels: [[]],
            specifiedSoftware: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(32)])],
            budgetPrice: ['1000', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(7)])],
            demandCycle: ['1', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3)])],
            abortDate: ['', Validators.compose([Validators.required])],
            summary: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(255)])],
            company: [''],
            detailInfo: ['', Validators.compose([Validators.maxLength(1024)])],
            levelIds: [[]],
        });
        this.formGroup.patchValue(this.navParams.get("demand"));
        this.demandServiceProvider.listDemandCategories().then(data => {
            if (data != null && data.length != 0) {
                this.demandCategories = data;
                // this.demandCategories[0].check = true;
                this.demandCategories.forEach(demandCategory => {
                    if (demandCategory.categoryId == this.formGroup.value.demandCategory.categoryId) {
                        this.selectCategory = demandCategory;
                        this.skillServiceProvider.listSkillsByDemandCategory(demandCategory.categoryId).then(data => {
                            demandCategory.skills = this.sortByObjId(data, 'skillId', true);
                            demandCategory.skills.forEach(skill => {
                                this.skillServiceProvider.listSkillLevelsBySkill(skill.skillId).then(data => {
                                    skill.skillLevels = this.sortByObjId(data, 'sortOrder', true);
                                    skill.skillLevels.forEach(skillLevel => {
                                        this.formGroup.value.skillLevels.forEach(skillLevel1 => {
                                            if (skillLevel.levelId == skillLevel1.levelId) {
                                                skillLevel.check = true
                                                this.selectCategory.skills.forEach(skill1 => {
                                                    if (skill1.skillId == skill.skillId) {
                                                        skill1.check = true;
                                                        skill1.selectSkillLevelName = skillLevel.levelName;
                                                    }
                                                })
                                            }
                                        })
                                    })
                                    this.skillLevels = this.formGroup.value.skillLevels;
                                });
                            })
                        });
                    } else {
                        this.skillServiceProvider.listSkillsByDemandCategory(demandCategory.categoryId).then(data => {
                            demandCategory.skills = this.sortByObjId(data, 'skillId', true);
                            demandCategory.skills.forEach(skill => {
                                this.skillServiceProvider.listSkillLevelsBySkill(skill.skillId).then(data => {
                                    skill.skillLevels = this.sortByObjId(data, 'sortOrder', true);
                                    skill.skillLevels.forEach(skillLevel => {
                                        skillLevel.check = false
                                    })
                                });
                            })
                        });
                    }

                })
            }
        })
    }

    presentCategory() {

        let alert = this.alertCtrl.create({
            title: '请选择技能',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    this.formGroup.patchValue({
                        skillLevels: []
                    });
                    this.selectCategory.skills.forEach(skill => skill.check = false)

                    let demandCategories = this.demandCategories.filter(demandCategory => data == demandCategory.categoryId);
                    this.demandCategories.forEach(demandCategorie => demandCategorie.check = false);
                    demandCategories[0].check = true;
                    this.selectCategory = demandCategories[0];
                    console.log(this.selectCategory)
                    this.formGroup.patchValue({
                        demandCategory: this.selectCategory
                    })
                }
            }],
        });

        for (let item of this.demandCategories) {
            if (item.check) {
                alert.addInput({
                    label: item.categoryName,
                    type: 'radio',
                    checked: true,
                    value: item.categoryId.toString()
                });
            } else {
                alert.addInput({
                    label: item.categoryName,
                    type: 'radio',
                    value: item.categoryId.toString()
                });
            }
        }
        alert.present()
    }

    selectFormSkillLevel(skill: Skill) {
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
                    let formSkillLevels: SkillLevel[] = this.formGroup.value.skillLevels;
                    formSkillLevels.forEach(skillLevel => {
                        skillLevels.forEach(skillLevel1 => {
                            if (skillLevel.levelId == skillLevel1.levelId) {
                                formSkillLevels.splice(formSkillLevels.indexOf(skillLevel), 1);
                            }
                        })
                    })
                    let skillLevel = skillLevels.filter(skillLevel => data == skillLevel.levelId)[0];
                    this.skillLevels.forEach(skillLevel => skillLevel.check = false);
                    skillLevel.check = true;
                    skill.check = true;
                    skill.selectSkillLevelName = skillLevel.levelName;
                    formSkillLevels.push(skillLevel);
                    this.formGroup.patchValue({
                        skillLevels: formSkillLevels
                    })
                }
            }],
        });
        for (let item of skillLevels) {
            if (item.check) {
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


    onSubmit(state: boolean) {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let demand: Demand = this.formGroup.value;
            demand.levelIds = demand.skillLevels.map(skillLevel => skillLevel.levelId)
            demand.skillLevels = [];
            if (state) {
                demand.demandState = DemandState.DRAFT;
            } else {
                demand.demandState = DemandState.PLATFORM_AUDIT;
            }
            this.demandServiceProvider.updateDemand(demand).then(data => {
                    if (data == 'success') {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '操作成功', duration: 1000}).present();
                    }
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                })
        }
    }
}

