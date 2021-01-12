import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadysmithComponent } from './ladysmith.component';

describe('LadysmithComponent', () => {
  let component: LadysmithComponent;
  let fixture: ComponentFixture<LadysmithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadysmithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadysmithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
