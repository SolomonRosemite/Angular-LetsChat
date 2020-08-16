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
  constructor(
    private auth: AuthService,
    private storage: StorageService,
    public dialogRef: MatDialogRef<EditProfileImageComponent>,
    private ngZone: NgZone,
    private eventEmitterService: EventEmitterService,
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

  fileChangeEvent(event: any): void {
    const x: FileList = event.target.files;

    if (!x.item(0).type.includes('image')) {
      this.eventEmitterService.showDialog(
        'Only Images.',
        'Please select an Image to set your Profile Picture.'
      );
      return;
    }

    if (x.item(0).size / 1024 / 1000 > 10) {
      this.eventEmitterService.showDialog(
        'File too big.',
        'Uploaded Image is too Large.'
      );
      return;
    }

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

  saveImage(): void {
    if (!this.croppedImage) {
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
