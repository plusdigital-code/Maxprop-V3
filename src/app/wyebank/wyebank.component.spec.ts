import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WyebankComponent } from './wyebank.component';

describe('WyebankComponent', () => {
  let component: WyebankComponent;
  let fixture: ComponentFixture<WyebankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WyebankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WyebankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
