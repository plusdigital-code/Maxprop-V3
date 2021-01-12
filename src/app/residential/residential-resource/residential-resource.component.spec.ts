import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialResourceComponent } from './residential-resource.component';

describe('ResidentialResourceComponent', () => {
  let component: ResidentialResourceComponent;
  let fixture: ComponentFixture<ResidentialResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
