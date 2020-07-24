import { FileReference } from './../../../../services/Models/FileReference.model';
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-file-reference-card',
  templateUrl: './file-reference-card.component.html',
  styleUrls: ['./file-reference-card.component.scss'],
})
export class FileReferenceCardComponent implements OnInit {
  constructor(private datepipe: DatePipe) {}

  @Input()
  input: FileReference;

  private _fileReference: FileReference;
  public get fileReference(): FileReference {
    if (!this._fileReference) {
      const date = ((this.input
        .date as any) as firebase.firestore.Timestamp).toDate();

      this._fileReference = new FileReference({
        date: date,
        fileFileReferenceUrl: this.input.fileFileReferenceUrl,
        filename: this.input.filename,
        fullFilename: this.input.fullFilename,
      });
    }
    return this._fileReference;
  }
  public set fileReference(v: FileReference) {
    this._fileReference = v;
  }

  imageUrl = '../../../../../assets/images/file-Icon.png';

  ngOnInit(): void {
    const type = this.fileReference.getFileType().toLowerCase();
    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg') {
      this.imageUrl = this.fileReference.fileFileReferenceUrl;
    }
  }

  public displayFilename(filename: string): string {
    if (filename.length > 13) {
      return filename.substring(0, 13) + '...';
    }
    return filename;
  }

  transform(value: any): string {
    return this.datepipe.transform(value, 'dd.MMM.yyyy');
  }

  public downloadFile(): void {
    // TODO: Add Download function.
  }
}
