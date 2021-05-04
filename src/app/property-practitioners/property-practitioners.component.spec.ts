import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPractitionersComponent } from './property-practitioners.component';

describe('PropertyPractitionersComponent', () => {
  let component: PropertyPractitionersComponent;
  let fixture: ComponentFixture<PropertyPractitionersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPractitionersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPractitionersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
