// import { HomeComponent } from './../home.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-popup',
  templateUrl: './bottom-popup.component.html',
  styleUrls: ['./bottom-popup.component.scss'],
})
export class BottomPopupComponent implements OnInit {
  // constructor(private homeComponent: HomeComponent) {}
  constructor() {}

  ngOnInit(): void {}

  openLink(event: MouseEvent): void {
    // this.homeComponent.print();
    console.log('yes sir');
  }
}
