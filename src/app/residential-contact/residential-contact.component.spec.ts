import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialContactComponent } from './residential-contact.component';

describe('ResidentialContactComponent', () => {
  let component: ResidentialContactComponent;
  let fixture: ComponentFixture<ResidentialContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentialContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
