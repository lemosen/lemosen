import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TopicServiceProvider} from "../../providers/topic-service/topic-service";
import {FormBuilder, Validators} from "@angular/forms";
import {Topic} from "../../domain/Topic";
import {Board} from "../../domain/Board";
import {Author} from "../../domain/Author";
import {FormPage} from "../../common/formPage";
import {CompanyServiceProvider} from "../../providers/company-service/company-service";

/**
 * Generated class for the AddTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-topic',
    templateUrl: 'add-topic.html',
})
export class AddTopicPage extends FormPage {

    boards = []

    constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navCtrl: NavController, public fb: FormBuilder, public navParams: NavParams, private topicServiceProvider: TopicServiceProvider) {
        super();
    }

    ngOnInit(): void {
        this.topicServiceProvider.listBoards().then(data => {
            data.forEach(topic => {
                this.boards.push({tabName: topic.boardName, tabId: topic.boardId, check: false})
            })
        })
        let author: Author = new Author;
        author.accountName = CompanyServiceProvider.getLoginCompany().accountName;
        this.formGroup = this.fb.group({
            topicName: ['', Validators.compose([Validators.maxLength(16), Validators.required])],
            board: [null, Validators.required],
            topicContent: ['', Validators.compose([Validators.maxLength(10240), Validators.required])],
            author: [author]
        })
    }

    presentBoards() {
        let alert = this.alertCtrl.create({
            title: '请选择所属板块',
            buttons: [{
                text: '取消',
                handler: data => {
                }
            }, {
                text: '确定',
                handler: data => {
                    this.boards.forEach(board => board.check = false);
                    let selectBoards = this.boards.filter(board => data == board.tabId);
                    selectBoards[0].check = true;
                    let board: Board = new Board;
                    board.boardId = data;
                    board.boardName = selectBoards[0].tabName;
                    this.formGroup.patchValue({
                        board: board
                    })

                }
            }],
        });
        for (let item of this.boards) {
            if (item.check) {
                alert.addInput({
                    label: item.tabName,
                    type: 'radio',
                    checked: true,
                    value: item.tabId.toString()
                });
            } else {
                alert.addInput({
                    label: item.tabName,
                    type: 'radio',
                    value: item.tabId.toString()
                });
            }
        }
        alert.present()
    }

    onSubmit() {
        if (this.submitted) {
            return;
        }
        if (this.formGroup.valid) {
            let topic: Topic;
            topic = this.formGroup.value;
            this.topicServiceProvider.saveTopic(topic).then(data => {
                    if (data == 'success') {
                        this.navCtrl.pop();
                        this.toastCtrl.create({message: '发帖成功', duration: 2000}).present();
                        this.submitted = false;
                    }
                },
                error => {
                    this.toastCtrl.create({message: error.error, duration: 1000}).present();
                    this.submitted = false;
                })
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddTopicPage');
    }

}
