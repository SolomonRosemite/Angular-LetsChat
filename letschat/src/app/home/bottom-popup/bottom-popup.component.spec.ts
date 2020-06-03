import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPopupComponent } from './bottom-popup.component';

describe('BottomPopupComponent', () => {
  let component: BottomPopupComponent;
  let fixture: ComponentFixture<BottomPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
