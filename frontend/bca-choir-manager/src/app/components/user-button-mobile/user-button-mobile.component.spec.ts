import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserButtonMobileComponent } from './user-button-mobile.component';

describe('UserButtonMobileComponent', () => {
  let component: UserButtonMobileComponent;
  let fixture: ComponentFixture<UserButtonMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserButtonMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserButtonMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
