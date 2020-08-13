import { DatabaseService } from 'src/app/services/database/database.service';
import { Component, OnInit, Input } from '@angular/core';
import {
  AngularFireUploadTask,
  AngularFireStorage,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileReferenceInterface } from 'src/app/services/Models/FileReference.model';

import { Upload } from 'src/app/services/Models/upload.model';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss'],
})
export class UploadItemComponent implements OnInit {
  @Input() upload: Upload;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private myDatabase: DatabaseService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    const date = new Date();

    // The storage path
    const path = `/sharedfiles/${this.upload.chatId}/${date}_${this.upload.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.upload.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        const name = this.getFilename(this.upload.file.name);

        const fr: FileReferenceInterface = {
          date: date,
          chatId: this.upload.chatId,
          senderUid: this.upload.senderUid,
          receiverUid: this.upload.receiverUid,

          filename: name[0],
          fullFilename: `${name[0]}.${name[1]}`,
          fileFileReferenceUrl: this.downloadURL,
        };

        this.myDatabase.postFile(fr);
      })
    );
  }

  roundNumber(num): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  private getFilename(filename: string): string[] {
    const list = filename.split('.');

    if (list.length == 1) {
      return [filename, 'file'];
    }

    return list;
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
