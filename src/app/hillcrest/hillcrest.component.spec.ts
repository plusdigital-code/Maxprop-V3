import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HillcrestComponent } from './hillcrest.component';

describe('HillcrestComponent', () => {
  let component: HillcrestComponent;
  let fixture: ComponentFixture<HillcrestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HillcrestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HillcrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
