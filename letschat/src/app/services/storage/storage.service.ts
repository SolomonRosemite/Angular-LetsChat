import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { FileReference } from '../Models/FileReference.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

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

          filename: names[0],
          fileFileReferenceUrl: await task.ref.getDownloadURL(),
          fullFilename: `${names[0]}.${names[1]}`,
        })
      );
    }

    return frs;
  }

  public async updateProfilePicture(image: File, uid: string): Promise<string> {
    const ref = this.storage.ref(
      `/profilePictures/${uid}/${new Date()}_${image.name}`
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
}
