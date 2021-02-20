import { DownloadService } from './../../../../services/download/download.service';
import { StorageService } from './../../../../services/storage/storage.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import Compressor from 'compressorjs';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.component.html',
  styleUrls: ['./edit-profile-image.component.scss'],
})
export class EditProfileImageComponent implements OnInit {
  me: User;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  photoURL = '';

  images = {
    female:
      'https://firebasestorage.googleapis.com/v0/b/angular-letschat.appspot.com/o/preset%2FprofilePictures%2Ffemale-avatar.png?alt=media&token=f6043a05-e29b-4010-9cc5-a0adc90a0fb1',
    femaleSelected: 'https://i.ibb.co/z44RCMN/female-avatar-ticked.png',
    male:
      'https://firebasestorage.googleapis.com/v0/b/angular-letschat.appspot.com/o/preset%2FprofilePictures%2Fmale-avatar.png?alt=media&token=ed8484f2-d978-4bdb-b517-79dde09ffd92',
    maleSelected: 'https://i.ibb.co/R6Fy0tn/male-avatar-ticked.png',
  };

  male = this.images.male;
  female = this.images.femaleSelected;
  uploading = false;

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    public dialogRef: MatDialogRef<EditProfileImageComponent>,
    private ngZone: NgZone,
    private eventEmitterService: EventEmitterService,
    private download: DownloadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.signUp == true) {
      this.photoURL = 'https://i.ibb.co/vPRXQtX/female-avatar.png';
      return;
    }

    this.auth.getUser().then((user) => {
      this.photoURL = user.photoURL;
      this.me = user;
    });
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  selectImage(event: string): string {
    switch (event) {
      case 'male':
        this.photoURL = this.images.male;
        this.female = this.images.female;
        this.male = this.images.maleSelected;
        return this.male;

      case 'female':
        this.photoURL = this.images.female;
        this.female = this.images.femaleSelected;
        this.male = this.images.male;
        return this.female;
    }
  }

  fileChangeEvent(event: any): void {
    const file: FileList = event.target.files;

    if (!file.item(0).type.includes('image')) {
      this.eventEmitterService.showDialog(
        'Only Images',
        'Please select an Image to set your Profile Picture.'
      );
      return;
    }

    if (file.item(0).size / 1024 / 1000 > 10) {
      this.eventEmitterService.showDialog(
        'File too big.',
        'Uploaded Image is too Large.'
      );
      return;
    }

    this.data.signUp = false;

    this.imageChangedEvent = event;
  }

  dataURLtoFile(dataUrl: string, filename: string) {
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  async saveImage(): Promise<void> {
    this.uploading = true;

    if (!this.croppedImage && this.data.signUp === false) {
      this.dialogRef.close();
      return;
    }

    const thisObject = this;

    let uid: string;

    if (this.me) {
      uid = this.me.uid;
    } else {
      uid = this.data.uid;
    }

    if (this.data.signUp === true) {
      this.croppedImage = await this.download
        .download(this.photoURL)
        .toPromise();

      new Compressor(this.croppedImage, {
        quality: 0.4,
        success(result) {
          const file = thisObject.blobToFile(result, 'ProfilePicture');
          thisObject.storage
            .uploadProfilePictureTemporary(file, uid)
            .then((fileUrl) => {
              thisObject.ngZone.run(() => {
                thisObject.dialogRef.close([fileUrl, file]);
              });
            });
        },
      });
    } else {
      new Compressor(this.dataURLtoFile(this.croppedImage, 'ProfilePicture'), {
        quality: 0.4,
        success(result) {
          const file = thisObject.blobToFile(result, 'ProfilePicture');
          thisObject.storage
            .uploadProfilePictureTemporary(file, uid)
            .then((fileUrl) => {
              thisObject.ngZone.run(() => {
                thisObject.dialogRef.close([fileUrl, file]);
              });
            });
        },
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  private blobToFile(theBlob: Blob, fileName: string): File {
    let b: any = theBlob;
    try {
      b.lastModified = new Date();
      b.name = fileName;
    } catch (_) {}

    return <File>theBlob;
  }
}
