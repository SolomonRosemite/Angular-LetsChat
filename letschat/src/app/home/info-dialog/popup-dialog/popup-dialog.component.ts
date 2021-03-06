import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

import { EventEmitterService } from '../../../services/event/event-emitter.service';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss'],
})
export class PopupDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<PopupDialogComponent>,
    private eventEmitterService: EventEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.eventEmitterService.onClosePopupDialogFunction.subscribe(() => {
      this.dialogRef.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
