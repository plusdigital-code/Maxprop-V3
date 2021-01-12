import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialLeadsViewComponent } from './residential-leads-view.component';

describe('ResidentialLeadsViewComponent', () => {
  let component: ResidentialLeadsViewComponent;
  let fixture: ComponentFixture<ResidentialLeadsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialLeadsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialLeadsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
