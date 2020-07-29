import { DownloadService } from './../../../../services/download/download.service';
import { FileReference } from './../../../../services/Models/FileReference.model';
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-file-reference-card',
  templateUrl: './file-reference-card.component.html',
  styleUrls: ['./file-reference-card.component.scss'],
})
export class FileReferenceCardComponent implements OnInit {
  constructor(
    private datepipe: DatePipe,
    private downloadService: DownloadService
  ) {}

  @Input()
  input: FileReference;

  private _fileReference: FileReference;
  public get fileReference(): FileReference {
    if (!this._fileReference) {
      const date = ((this.input
        .date as any) as firebase.firestore.Timestamp).toDate();

      this._fileReference = new FileReference({
        date: date,
        chatId: this.input.chatId,
        receiverUid: this.input.receiverUid,
        senderUid: this.input.senderUid,

        fileFileReferenceUrl: this.input.fileFileReferenceUrl,
        filename: this.input.filename,
        fullFilename: this.input.fullFilename,
      });
    }
    return this._fileReference;
  }
  public set fileReference(v: FileReference) {
    this._fileReference = v;
  }

  imageUrl = '../../../../../assets/images/file-Icon.png';

  ngOnInit(): void {
    const type = this.fileReference.getFileType().toLowerCase();
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg') {
      this.imageUrl = this.fileReference.fileFileReferenceUrl;
    }
  }

  public displayFilename(filename: string): string {
    if (filename.length > 20) {
      return filename.substring(0, 20) + '...';
    }
    return filename;
  }

  transform(value: any): string {
    return this.datepipe.transform(value, 'dd.MMM.yyyy');
  }

  public viewFile(): void {
    window.open(this.fileReference.fileFileReferenceUrl);
  }

  public downloadFile(): void {
    this.downloadService
      .download(this.fileReference.fileFileReferenceUrl)
      .subscribe((blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = this.fileReference.fullFilename;
        a.click();

        URL.revokeObjectURL(objectUrl);
      });
  }
}
