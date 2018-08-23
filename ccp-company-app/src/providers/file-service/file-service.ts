import {Injectable} from "@angular/core";
import {FileTransferObject, FileUploadOptions, FileUploadResult} from "@ionic-native/file-transfer";
import {FilePath} from "@ionic-native/file-path";
import {File} from '@ionic-native/file';
import {HttpClient} from "@angular/common/http";
import {NativeServiceProvider} from "../native-service/native-service";
import {AppConfig} from "../../app/AppConfig";
import {CompanyServiceProvider} from "../company-service/company-service";

/*
  Generated class for the FileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FileServiceProvider {

    constructor(public http: HttpClient, private filePath: FilePath, private file: File, private nativeService: NativeServiceProvider,) {
        console.log('Hello FileServiceProvider Provider');
    }

    /**
     * 上传文件
     * @param path 设备文件路径
     * @param actionUrl 请求路径
     * @param fileName 文件名
     * @returns {Promise<FileUploadResult>}
     */
    async uploadFile(path: string, actionUrl: string = "/file/uploadFile.do", fileName: any = ''): Promise<any> {
        let entry = await this.file.resolveLocalFilesystemUrl(path);
        this.nativeService.showLoading();

        return new Promise((resolve, reject) => {
            entry.getMetadata(metadata => {
                if (metadata.size > 20971520) {
                    reject("文件太大");
                    this.nativeService.hideLoading();
                    let size = this.toDecimal(metadata.size / 1048576);
                    this.nativeService.showToast("附件不能超过20M,当前文件" + size + "M!");
                } else {
                    this.filePath.resolveNativePath(path).then(filePath => {
                        let name = fileName;
                        if (fileName == '') {
                            name = CompanyServiceProvider.getLoginCompany().accountName;
                        }

                        let options: FileUploadOptions = {
                            params: null,
                            fileName: name,
                            // headers: {token: this.globalData.token}
                        };
                        const fileTransfer: FileTransferObject = new FileTransferObject();
                        fileTransfer.onProgress((event) => {

                        });
                        fileTransfer.upload(path, AppConfig.host + actionUrl, options).then(
                            result => {
                                this.nativeService.hideLoading();
                                // alert("resolve");
                                resolve(JSON.parse(result.response));
                            }
                        );
                    })
                        .catch(err => {
                            this.nativeService.hideLoading();
                            // alert("reject");
                            reject(err);
                        });
                }
            })
        });
    }


    private static getFileType(path: string): string {
        return path.substring(path.lastIndexOf('.') + 1);
    }

    private static getFileName(path: string): string {
        return path.substring(path.lastIndexOf("/") + 1, path.length);
    }

    private toDecimal(x) {
        let f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x * 100) / 100;
        return f;
    }

}
