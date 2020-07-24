import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  public async uploadFiles(files: FileList, chatId: string): Promise<string[]> {
    let downloadURLs: string[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      const ref = this.storage.ref(
        `/sharedfiles/${chatId}/${new Date()}_${file.name}`
      );
      const task = await ref.put(file);
      downloadURLs.push(await task.ref.getDownloadURL());
    }

    return downloadURLs;
  }
}
