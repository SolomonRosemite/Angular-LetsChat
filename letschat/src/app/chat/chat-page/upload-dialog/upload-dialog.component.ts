import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

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
    @Inject(MAT_DIALOG_DATA) private data: any[]
  ) {
    console.log(data);
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
