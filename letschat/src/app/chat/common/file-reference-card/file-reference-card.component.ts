import { FileReference } from './../../../services/Models/FileReference.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-reference-card',
  templateUrl: './file-reference-card.component.html',
  styleUrls: ['./file-reference-card.component.scss'],
})
export class FileReferenceCardComponent implements OnInit {
  constructor() {}

  fileReference: FileReference;

  ngOnInit(): void {
    this.fileReference = new FileReference({
      date: '20.02.2020',
      fileFileReferenceUrl: '',
      filename: 'SchoolHomework From Ms.Skrrr',
      fullFilename: 'SchoolHomework From Ms.Skrrr.pdf',
    });
  }

  public displayFilename(filename: string): string {
    if (filename.length > 15) {
      return filename.substring(0, 15) + '...';
    }
    return filename;
  }
}
