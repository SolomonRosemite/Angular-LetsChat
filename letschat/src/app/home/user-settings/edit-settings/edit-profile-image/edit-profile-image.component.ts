import { StorageService } from './../../../../services/storage/storage.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/services/Models/user.model';

import { CropperComponent } from 'angular-cropperjs';
import { async } from 'rxjs/internal/scheduler/async';

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

  constructor(private auth: AuthService, private storage: StorageService) {}

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
    this.angularCropper.cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      this.storage.updateProfilePicture(
        this.blobToFile(blob, 'ProfilePicture'),
        this.me.uid
      );
    });
  }

  private blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }
}
