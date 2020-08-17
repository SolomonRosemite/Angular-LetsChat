import { Router } from '@angular/router';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { EventEmitterService } from '../../services/event/event-emitter.service';
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
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) {}

  route: string;
  date: number;

  ngOnInit(): void {
    this.route = this.router.url;
    this.date = new Date().getTime();

    this.eventEmitterService.dialogs.push({
      date: this.date,
      path: this.router.url,
    });

    this.eventEmitterService.onOpenPopupDialogFunction.subscribe((item) => {
      if (
        this.isLatestDialog(this.date) === true &&
        this.router.url === this.route
      ) {
        this.openDialog(item);
      }
    });
  }

  isLatestDialog(date: number): boolean {
    return this.eventEmitterService.dialogs
      .filter((item) => item.path === this.route)
      .every((item) => date >= item.date);
  }

  openDialog(items: string[]) {
    const myTitle = items[0];
    const myText = items[1];

    this.dialog.open(PopupDialogComponent, {
      data: { title: myTitle, text: myText },
    });
  }
}
