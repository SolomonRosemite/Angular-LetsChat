import { EventEmitterService } from './../event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private eventEmitterService: EventEmitterService) {}

  ngOnInit(): void {}

  openBottomSheet(): void {
    this.eventEmitterService.onBottomBarClickOpen();
  }
}
