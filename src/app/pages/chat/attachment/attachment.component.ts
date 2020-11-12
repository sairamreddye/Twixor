import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiDataService } from '../../../providers/api-data.service';
import { UserDataService } from '../../../providers/user-data.service';
import { AppConfig } from '../../../providers/APP_CONFIG';
import { attachments, PreviewData } from '../../../interfaces/user-options';
@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent {
  private _attachment: string; 
  segment = 'public';
  attachments: attachments = [];
  displayMessage: boolean;
  displayText: string;
  attachmentType: number;
  loading: any;
  WAIT_MSG = 'Pls wait..Syncing Attachments-';
  NETWORK_OFFLINE = 'none';
  NO_ATTACHMENTS = 'No Available Attachments!';
  ATTACHMENTS_ERROR = 'error in fetching Attachments';
  NETWORK_OFFLINE_MSG = 'Attachments list not Synced,Please Turn On Internet!';
  constructor(
    private apiData : ApiDataService,
    public dialogRef: MatDialogRef<AttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userData : UserDataService
    ){ 
       this._attachment = data.type;
     switch (this._attachment) {
      case AppConfig.ENV.ATTACHMENT.DOCUMENT:
        this.attachmentType = AppConfig.ENV.ATTACHMENT.DOCTYPE;
        break;
      case AppConfig.ENV.ATTACHMENT.MEDIA:
        this.attachmentType = AppConfig.ENV.ATTACHMENT.MEDIATYPE;
        break;
      case AppConfig.ENV.ATTACHMENT.MAP:
        this.attachmentType = AppConfig.ENV.ATTACHMENT.MAPTYPE;
        break;
      case AppConfig.ENV.ATTACHMENT.URL:
        this.attachmentType = AppConfig.ENV.ATTACHMENT.URLTYPE;
        break;
      case AppConfig.ENV.ATTACHMENT.MESSAGE:
        this.attachmentType = AppConfig.ENV.ATTACHMENT.MSGTYPE;
        break;
      default:
    }
    this.getAttachment();
    }

   getAttachment() {
    if (navigator.onLine === true) {
      this.apiData.getAttachment(this.attachmentType, this.segment).subscribe(
        result => {
        let parsedResult = result;
        if (parsedResult.status === true) {
          if (parsedResult.response.artifacts.length > 0) {
            this.attachments = parsedResult.response.artifacts;
            this.displayMessage = false;
          }
          else {
            this.displayText = this.NO_ATTACHMENTS;
            this.displayMessage = true;
          }
        } else {
           this.userData.showToast(parsedResult.message);
        }
      },
      error => console.log('HTTP attachments Error', error));
    } else {
      this.displayText = this.NETWORK_OFFLINE_MSG;
      this.displayMessage = true;
      this.userData.showToast('error',this.NETWORK_OFFLINE_MSG);
    }
  }
  
  switchSegment(segment: string){
    this.segment = segment;
    this.attachments = [];
    this.getAttachment();
  }
  selectAttachment(index: any){
    this.dialogRef.close({ event: 'close', data: this.attachments[index] });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  trackById(index: number, attachment: PreviewData) {
    return attachment._id;
  }
}
