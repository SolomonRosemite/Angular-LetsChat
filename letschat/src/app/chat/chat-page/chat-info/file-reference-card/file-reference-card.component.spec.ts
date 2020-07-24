import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReferenceCardComponent } from './file-reference-card.component';

describe('FileReferenceCardComponent', () => {
  let component: FileReferenceCardComponent;
  let fixture: ComponentFixture<FileReferenceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReferenceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReferenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
