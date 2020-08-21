import { FileReference } from './../Models/FileReference.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  public async uploadFiles(
    files: FileList,
    chatId: string,
    senderUid: string,
    receiverUid: string
  ): Promise<FileReference[]> {
    const frs: FileReference[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const date = new Date();

      const ref = this.storage.ref(
        `/sharedfiles/${chatId}/${date}_${file.name}`
      );
      const task = await ref.put(file);

      const names = this.getFilenames(file.name);

      frs.push(
        new FileReference({
          date: date,
          chatId: chatId,
          senderUid: senderUid,
          receiverUid: receiverUid,

          pathRef: task.ref.fullPath,
          filename: names[0],
          fileFileReferenceUrl: await task.ref.getDownloadURL(),
          fullFilename: `${names[0]}.${names[1]}`,
        })
      );
    }

    return frs;
  }

  public async updateProfilePicture(image: File, uid: string): Promise<string> {
    const ref = this.storage.ref(`/profilePictures/${uid}/ProfilePicture`);
    const task = await ref.put(image);

    const url = await task.ref.getDownloadURL();

    return url;
  }

  public async uploadProfilePictureTemporary(
    image: File,
    uid: string
  ): Promise<string> {
    const ref = this.storage.ref(
      `/temporarilyProfilePictures/${uid}/ProfilePicture`
    );
    const task = await ref.put(image);

    const url = await task.ref.getDownloadURL();

    return url;
  }

  private getFilenames(filename: string): string[] {
    const list = filename.split('.');

    if (list.length == 1) {
      return [filename, 'file'];
    }

    return list;
  }

  public async removeFile(
    senderUid: string,
    receiverUid: string,
    chatId: string,
    fileFileReferenceUrl: string,
    pathRef: string
  ) {
    this.removeFileForUserOnly(senderUid, chatId, fileFileReferenceUrl);

    this.removeFileForUserOnly(receiverUid, chatId, fileFileReferenceUrl);

    return this.storage.ref(`${pathRef}`).delete();
  }

  public async removeFileForUserOnly(
    uid: string,
    chatId: string,
    fileFileReferenceUrl: string
  ) {
    const ref = this.firestore
      .collection('sharedfiles')
      .doc(uid)
      .collection(chatId).ref;

    const files = await ref.get();

    let i = 0;

    files.docs.some((item) => {
      const fileInfo = item.data() as FileReference;
      if (fileInfo.fileFileReferenceUrl === fileFileReferenceUrl) {
        return fileInfo;
      }
      ++i;

      return false;
    });

    return ref.doc(files.docs[i].id).delete();
  }
}
