import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesPageComponent } from './chat-messages-page.component';

describe('ChatMessagesPageComponent', () => {
  let component: ChatMessagesPageComponent;
  let fixture: ComponentFixture<ChatMessagesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMessagesPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
