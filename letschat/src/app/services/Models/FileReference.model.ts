interface FileReferenceInterface {
  fileFileReferenceUrl: string;
  fullFilename: string;
  filename: string;
  date: Date;
}

export class FileReference {
  constructor(fileReference?: FileReferenceInterface) {
    this.fileFileReferenceUrl = fileReference.fileFileReferenceUrl;
    this.fullFilename = fileReference.fullFilename;
    this.filename = fileReference.filename;
    this.date = fileReference.date;
  }

  public fileFileReferenceUrl: string;
  public fullFilename: string;
  public filename: string;
  public date: Date;

  public getFileType(): string {
    if (this.fullFilename.includes('.') === false) {
      return this.fullFilename;
    }
    const index = this.fullFilename.split('.').length - 1;
    return this.fullFilename.split('.')[index];
  }
}
