import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburblistComponent } from './suburblist.component';

describe('SuburblistComponent', () => {
  let component: SuburblistComponent;
  let fixture: ComponentFixture<SuburblistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuburblistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuburblistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
