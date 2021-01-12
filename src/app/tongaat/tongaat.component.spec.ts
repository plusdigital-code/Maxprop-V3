import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TongaatComponent } from './tongaat.component';

describe('TongaatComponent', () => {
  let component: TongaatComponent;
  let fixture: ComponentFixture<TongaatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TongaatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TongaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
