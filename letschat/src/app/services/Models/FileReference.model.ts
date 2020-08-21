export interface FileReferenceInterface {
  date: Date;
  chatId: string;
  senderUid: string;
  receiverUid: string;

  pathRef: string;
  filename: string;
  fullFilename: string;
  fileFileReferenceUrl: string;
}

export class FileReference {
  constructor(fr: FileReferenceInterface) {
    this.date = fr.date;
    this.chatId = fr.chatId;
    this.senderUid = fr.senderUid;
    this.receiverUid = fr.receiverUid;

    this.pathRef = fr.pathRef;
    this.filename = fr.filename;
    this.fullFilename = fr.fullFilename;
    this.fileFileReferenceUrl = fr.fileFileReferenceUrl;
  }

  public date: Date;
  public chatId: string;
  public senderUid: string;
  public receiverUid: string;

  public pathRef: string;
  public filename: string;
  public fullFilename: string;
  public fileFileReferenceUrl: string;

  public getFileType(): string {
    if (this.fullFilename.includes('.') === false) {
      return this.fullFilename;
    }
    const index = this.fullFilename.split('.').length - 1;
    return this.fullFilename.split('.')[index];
  }
}
