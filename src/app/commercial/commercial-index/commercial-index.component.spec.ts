import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialIndexComponent } from './commercial-index.component';

describe('CommercialIndexComponent', () => {
  let component: CommercialIndexComponent;
  let fixture: ComponentFixture<CommercialIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
