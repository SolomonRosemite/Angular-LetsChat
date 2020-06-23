export class FileReference {
  constructor({ fileFileReferenceUrl, fullFilename, filename, date }) {
    this.fileFileReferenceUrl = fileFileReferenceUrl;
    this.fullFilename = fullFilename;
    this.filename = filename;
    this.date = date;
  }
  public fileFileReferenceUrl: string;
  public fullFilename: string;
  public filename: string;
  public date: string;

  public getFileType(): string {
    if (this.fullFilename.includes('.') === false) {
      return this.fullFilename;
    }
    const index = this.fullFilename.split('.').length - 1;
    return this.fullFilename.split('.')[index];
  }
}
