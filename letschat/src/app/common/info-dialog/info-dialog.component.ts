import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialogComponent);
  }

  ngOnInit(): void {}
}

@Component({
  selector: 'app-info-dialog-elements',
  templateUrl: './info-dialog.component.html',
})
export class DialogElementsExampleDialogComponent {}
