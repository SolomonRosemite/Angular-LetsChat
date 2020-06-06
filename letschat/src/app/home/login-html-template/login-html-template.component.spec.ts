import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHtmlTemplateComponent } from './login-html-template.component';

describe('LoginHtmlTemplateComponent', () => {
  let component: LoginHtmlTemplateComponent;
  let fixture: ComponentFixture<LoginHtmlTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHtmlTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHtmlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
