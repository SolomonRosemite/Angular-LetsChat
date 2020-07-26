import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import {
  AngularFirestoreDocument,
  DocumentReference,
  DocumentData,
<<<<<<< Updated upstream
} from 'angularfire2/firestore';
=======
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
>>>>>>> Stashed changes
import { User } from '../Models/user.model';
import { Message } from '../Models/message.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  public receiveMessages(user: User) {
    return this.firestore
      .collection('messages')
      .doc(user.uid)
      .collection<Message>('chats');
  }

  public async sendMessage(data: Message): Promise<DocumentReference[]> {
    const docs: DocumentReference[] = [];

    const message: Message = {
      chatId: data.chatId,
      message: data.message,
      receiverDisplayName: data.receiverDisplayName,
      receiverPhotoURL: data.receiverPhotoURL,
      receiverUid: data.receiverUid,
      senderDisplayName: data.senderDisplayName,
      senderPhotoURL: data.senderPhotoURL,
      senderUid: data.senderUid,
      timestamp: data.timestamp,
    };

    docs.push(
      await this.firestore
        .collection('messages')
        .doc(message.senderUid)
        .collection('chats')
        .add(message)
    );

    docs.push(
      await this.firestore
        .collection('messages')
        .doc(message.receiverUid)
        .collection('chats')
        .add(message)
    );

    return docs;
  }

  public updateUser(updatedUser: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${updatedUser.uid}`
    );

    const data = {
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      photoURL: updatedUser.photoURL,
      location: updatedUser.location,
      uid: updatedUser.uid,
    };

    return userRef.set(data, { merge: true });
  }

  public async getAllUsers(): Promise<User[]> {
    var x = this.firestore.collection('users').ref;
    let users: User[] = [];

    (await x.get()).docs.forEach((data) => {
      users.push(data.data() as User);
    });
    return users;
  }
}
