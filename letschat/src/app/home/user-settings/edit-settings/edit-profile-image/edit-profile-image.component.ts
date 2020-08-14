import { StorageService } from './../../../../services/storage/storage.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';

import { CropperComponent } from 'angular-cropperjs';
import { MatDialogRef } from '@angular/material/dialog';

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
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    console.log();
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
        const fileUrl = await this.storage.updateProfilePicture(
          this.blobToFile(blob, 'ProfilePicture'),
          this.me.uid
        );
        // TODO: Check if fileUrl undefined
        this.ngZone.run(() => {
          this.dialogRef.close(fileUrl);
        });
      });
  }

  private blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  }
}
