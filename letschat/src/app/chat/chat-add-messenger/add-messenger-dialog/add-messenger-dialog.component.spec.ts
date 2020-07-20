import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessengerDialogComponent } from './add-messenger-dialog.component';

describe('AddMessengerDialogComponent', () => {
  let component: AddMessengerDialogComponent;
  let fixture: ComponentFixture<AddMessengerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMessengerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessengerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
