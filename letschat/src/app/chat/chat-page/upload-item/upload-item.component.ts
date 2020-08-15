import { EventEmitterService } from './../../../services/event/event-emitter.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AngularFireUploadTask,
  AngularFireStorage,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, retry } from 'rxjs/operators';
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
  @Output() complete = new EventEmitter<void>();

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  filename = '';
  fileCanceled = false;
  isComplete = false;

  constructor(
    private myDatabase: DatabaseService,
    private storage: AngularFireStorage,
    private eventEmitter: EventEmitterService
  ) {}

  ngOnInit() {
    this.eventEmitter.onCancelUploads.subscribe(() => this.cancelUpload());
    this.startUpload();
    const name = this.getFilename(this.upload.file.name);
    this.filename = name[0] + name[0];
  }

  cancelUpload(): void {
    if (this.isComplete == true) {
      return;
    }

    this.fileCanceled = true;
    this.task.cancel();
    this.complete.emit();
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
        if (this.fileCanceled == true) {
          return;
        }
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

        this.isComplete = true;
        this.complete.emit();
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
    if (this.fileCanceled == true) {
      return false;
    }
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
