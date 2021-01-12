import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmhlangaComponent } from './umhlanga.component';

describe('UmhlangaComponent', () => {
  let component: UmhlangaComponent;
  let fixture: ComponentFixture<UmhlangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmhlangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmhlangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
