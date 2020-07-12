import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { EventEmitterService } from '../../services/event-emitter.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit(): void {
    this.eventEmitterService.invokeOpenPopupDialogFunction.subscribe((item) => {
      this.openDialog(item);
    });

    this.eventEmitterService.invokeClosePopupDialogFunction.subscribe(() => {
      this.dialog.closeAll();
    });
  }

  openDialog(items: string[]) {
    const myTitle = items[0];
    const myText = items[1];

    this.dialog.open(PopupDialogComponent, {
      data: { title: myTitle, text: myText },
    });
  }
}
