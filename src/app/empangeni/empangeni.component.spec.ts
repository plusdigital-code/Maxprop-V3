import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpangeniComponent } from './empangeni.component';

describe('EmpangeniComponent', () => {
  let component: EmpangeniComponent;
  let fixture: ComponentFixture<EmpangeniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpangeniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpangeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
