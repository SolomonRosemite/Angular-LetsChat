import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAddMessengerComponent } from './chat-add-messenger.component';

describe('ChatAddMessengerComponent', () => {
  let component: ChatAddMessengerComponent;
  let fixture: ComponentFixture<ChatAddMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAddMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAddMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
