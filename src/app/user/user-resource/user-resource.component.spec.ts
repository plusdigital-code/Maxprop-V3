import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResourceComponent } from './user-resource.component';

describe('UserResourceComponent', () => {
  let component: UserResourceComponent;
  let fixture: ComponentFixture<UserResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
