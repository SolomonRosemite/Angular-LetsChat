import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupHtmlTemplateComponent } from './signup-html-template.component';

describe('SignupHtmlTemplateComponent', () => {
  let component: SignupHtmlTemplateComponent;
  let fixture: ComponentFixture<SignupHtmlTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupHtmlTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupHtmlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
