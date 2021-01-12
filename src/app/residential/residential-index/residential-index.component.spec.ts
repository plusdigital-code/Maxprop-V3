import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialIndexComponent } from './residential-index.component';

describe('ResidentialIndexComponent', () => {
  let component: ResidentialIndexComponent;
  let fixture: ComponentFixture<ResidentialIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
