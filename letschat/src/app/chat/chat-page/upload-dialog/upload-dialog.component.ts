import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

interface Upload {
  progress: number;
  file: File;
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    private database: DatabaseService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: FileList
  ) {
    for (let i = 0; i < data.length; i++) {
      const file = data[i];

      this.uploads.push({
        file: file,
        progress: 0,
      });
    }
  }

  uploads: Upload[] = [];

  ngOnInit(): void {
    console.log(this.uploads);
  }

  cancelAllUpload(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
