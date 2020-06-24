import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import {
  AngularFirestoreDocument,
  DocumentReference,
  DocumentData,
} from 'angularfire2/firestore';
import { User } from '../Models/user.model';
import { Message } from '../Models/message.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  public receiveMessages(user: User): DocumentData {
    return this.firestore
      .collection('messages')
      .doc(user.uid)
      .collection<Message>('chats')
      .get();
  }

  public sendMessage(user: User, data: Message): Promise<DocumentReference> {
    return this.firestore
      .collection('messages')
      .doc(user.uid)
      .collection('chats')
      .add(data);
  }

  public updateDisplayName(user: User, newDisplayName: string): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${user.uid}`
    );

    const data = {
      displayName: newDisplayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };

    return userRef.set(data, { merge: true });
  }
}
