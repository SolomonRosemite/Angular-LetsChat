import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-popup',
  templateUrl: './bottom-popup.component.html',
  styleUrls: ['./bottom-popup.component.scss'],
})
export class BottomPopupComponent implements OnInit {
  constructor(private eventEmitterService: EventEmitterService) {}

  ngOnInit(): void {}

  close(): void {
    this.eventEmitterService.onBottomBarClickClose();
  }
}
