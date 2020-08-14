import { StorageService } from './../../../../services/storage/storage.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';

import { CropperComponent } from 'angular-cropperjs';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import Compressor from 'compressorjs';

@Component({
  selector: 'app-edit-profile-image',
  templateUrl: './edit-profile-image.component.html',
  styleUrls: ['./edit-profile-image.component.scss'],
})
export class EditProfileImageComponent implements OnInit {
  @ViewChild('angularCropper', { static: true })
  public angularCropper: CropperComponent;
  me: User;

  photoURL = '';
  constructor(
    private auth: AuthService,
    private storage: StorageService,
    public dialogRef: MatDialogRef<EditProfileImageComponent>,
    private ngZone: NgZone,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit(): void {
    this.angularCropper.ready.subscribe(() => {
      this.angularCropper.cropper.setAspectRatio(1);
    });
    this.auth.getUser().then((user) => {
      this.photoURL = user.photoURL;
      this.me = user;
    });
  }

  saveImage(): void {
    this.angularCropper.cropper
      .getCroppedCanvas()
      .toBlob(async (blob: Blob) => {
        const thisObject = this;

        new Compressor(blob, {
          quality: 0.2,
          success(result) {
            thisObject.storage
              .updateProfilePicture(
                thisObject.blobToFile(result, 'ProfilePicture'),
                thisObject.me.uid
              )
              .then((fileUrl) => {
                thisObject.ngZone.run(() => {
                  thisObject.dialogRef.close(fileUrl);
                });
              });
          },
          error(err) {
            console.log(err.message);
          },
        });
      });
  }

  async uploadImage(file: FileList): Promise<void> {
    if (file.length == 0) {
      return;
    }

    if (!file[0].type.includes('image')) {
      this.eventEmitterService.showDialog(
        'Only Images.',
        'Please select an Image to set your Profile Picture.'
      );
      return;
    }

    if (file[0].size / 1024 / 1000 > 5) {
      this.eventEmitterService.showDialog(
        'File too big.',
        "Files can't be bigger than 5MB"
      );
      return;
    }

    const thisObject = this;

    new Compressor(file[0], {
      quality: 0.2,
      success(result) {
        thisObject.storage
          .uploadProfilePictureTemporary(
            thisObject.blobToFile(result, 'ProfilePicture'),
            thisObject.me.uid
          )
          .then((value) => (thisObject.photoURL = value));
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  private blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  }
}
