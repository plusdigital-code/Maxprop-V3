import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxpropDigitalComponent } from './maxprop-digital.component';

describe('MaxpropDigitalComponent', () => {
  let component: MaxpropDigitalComponent;
  let fixture: ComponentFixture<MaxpropDigitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxpropDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxpropDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
