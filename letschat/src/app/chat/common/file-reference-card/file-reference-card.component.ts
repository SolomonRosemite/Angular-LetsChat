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
      date: '24.06.2020',
      fileFileReferenceUrl:
        'https://static01.nyt.com/images/2019/11/05/science/28TB-SUNSET1/merlin_163473282_fe17fc6b-78b6-4cdd-b301-6f63e6ebdd7a-superJumbo.jpg',
      filename: 'Math Homework',
      fullFilename: 'Math Homework.pdf',
    });

    const type = this.fileReference.getFileType().toLowerCase();

    if (type === 'png' || type === 'gif' || type === 'jpg' || type === 'jpeg') {
      this.imageUrl = this.fileReference.fileFileReferenceUrl;
      console.log('hererererer');
    }
  }

  public displayFilename(filename: string): string {
    if (filename.length > 13) {
      return filename.substring(0, 13) + '...';
    }
    return filename;
  }

  public downloadFile(): void {
    // TODO: Add Download function.
  }
}
