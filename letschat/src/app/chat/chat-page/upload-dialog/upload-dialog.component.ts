import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Upload } from 'src/app/services/Models/upload.model';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public files: any
  ) {
    for (let i = 0; i < files.file.length; i++) {
      this.uploads.push({
        chatId: files.chatId,
        file: files.file.item(i),
        receiverUid: files.receiverUid,
        senderUid: files.receiverUid,
      });
    }
  }

  uploads: Upload[] = [];

  ngOnInit(): void {
    console.log(this.uploads);
  }

  close(): void {
    this.dialogRef.close();
  }
}
