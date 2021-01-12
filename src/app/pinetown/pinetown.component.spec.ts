import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinetownComponent } from './pinetown.component';

describe('PinetownComponent', () => {
  let component: PinetownComponent;
  let fixture: ComponentFixture<PinetownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinetownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinetownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
