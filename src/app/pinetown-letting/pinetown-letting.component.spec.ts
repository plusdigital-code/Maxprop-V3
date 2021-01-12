import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinetownLettingComponent } from './pinetown-letting.component';

describe('PinetownLettingComponent', () => {
  let component: PinetownLettingComponent;
  let fixture: ComponentFixture<PinetownLettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinetownLettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinetownLettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
