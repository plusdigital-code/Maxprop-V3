import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BereaComponent } from './berea.component';

describe('BereaComponent', () => {
  let component: BereaComponent;
  let fixture: ComponentFixture<BereaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BereaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BereaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
