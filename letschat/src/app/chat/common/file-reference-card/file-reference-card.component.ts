import { FileReference } from './../../../services/Models/FileReference.model';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-reference-card',
  templateUrl: './file-reference-card.component.html',
  styleUrls: ['./file-reference-card.component.scss'],
})
export class FileReferenceCardComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  fileReference: FileReference;
  imageUrl = '../../../../assets/images/file-Icon.png';

  ngOnInit(): void {
    this.fileReference = new FileReference({
      date: '20.02.2020',
      fileFileReferenceUrl:
        'https://static01.nyt.com/images/2019/11/05/science/28TB-SUNSET1/merlin_163473282_fe17fc6b-78b6-4cdd-b301-6f63e6ebdd7a-superJumbo.jpg',
      filename: 'SchoolHomework From Ms.Skrrr',
      fullFilename: 'SchoolHomework From Ms.Skrrr.pdf',
    });

    switch (this.fileReference.getFileType().toLowerCase()) {
      case 'png':
        this.imageUrl = this.fileReference.fileFileReferenceUrl;
        break;
      case 'gif':
        this.imageUrl = this.fileReference.fileFileReferenceUrl;
        break;
      case 'jpg':
        this.imageUrl = this.fileReference.fileFileReferenceUrl;
        break;
      case 'jpeg':
        this.imageUrl = this.fileReference.fileFileReferenceUrl;
        break;
    }
  }

  public displayFilename(filename: string): string {
    if (filename.length > 15) {
      return filename.substring(0, 15) + '...';
    }
    return filename;
  }

  public downloadFile(): void {
    // TODO: Add Download function.
  }
}
