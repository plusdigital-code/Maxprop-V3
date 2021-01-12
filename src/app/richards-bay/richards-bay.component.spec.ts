import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichardsBayComponent } from './richards-bay.component';

describe('RichardsBayComponent', () => {
  let component: RichardsBayComponent;
  let fixture: ComponentFixture<RichardsBayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichardsBayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichardsBayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
