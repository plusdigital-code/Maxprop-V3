import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialLeadsResourceComponent } from './residential-leads-resource.component';

describe('ResidentialLeadsResourceComponent', () => {
  let component: ResidentialLeadsResourceComponent;
  let fixture: ComponentFixture<ResidentialLeadsResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialLeadsResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialLeadsResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
