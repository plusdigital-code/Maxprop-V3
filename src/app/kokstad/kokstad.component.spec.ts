import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KokstadComponent } from './kokstad.component';

describe('KokstadComponent', () => {
  let component: KokstadComponent;
  let fixture: ComponentFixture<KokstadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KokstadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KokstadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
