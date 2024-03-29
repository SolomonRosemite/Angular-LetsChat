import { StorageService } from './../storage/storage.service';
import { DownloadService } from './../download/download.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user$: Observable<User>;

  public async getUser(): Promise<User> {
    return new Promise((resolve) => {
      this.user$.subscribe((success) => {
        resolve(success);
      });
    });
  }

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private downloadService: DownloadService,
    private storage: StorageService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  emailSignup(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  emailSignin(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  emailResetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async googleSignin(userLocation: string): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    const user: User = {
      displayName: credential.user.displayName,
      email: credential.user.email,
      location: userLocation,
      photoURL: credential.user.photoURL,
      uid: credential.user.uid,
    };

    return await this.setUserData(user);
  }

  async setUserData(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    let data: User = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      uid: user.uid,
    };

    const item = await userRef.get().toPromise();

    if (item.exists) {
      return;
    }

    const blob = await this.downloadService.download(data.photoURL).toPromise();
    const file = this.blobToFile(blob, 'ProfilePicture');

    data.photoURL = await this.storage.updateProfilePicture(file, data.uid);
    data.location = user.location;

    return userRef.set(data, { merge: true });
  }

  private blobToFile(theBlob: Blob, fileName: string): File {
    let b: any = theBlob;
    try {
      b.lastModified = new Date();
      b.name = fileName;
    } catch (_) {}

    return <File>theBlob;
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
