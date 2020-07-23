import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    private router: Router
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
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  emailSignin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async googleSignin(userLocation: string) {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

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
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      location: user.location,
      email: user.email,
      uid: user.uid,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
