import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialContactsComponent } from './commercial-contacts.component';

describe('CommercialContactComponent', () => {
  let component: CommercialContactsComponent;
  let fixture: ComponentFixture<CommercialContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
