import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePopupComponent } from './home-page-popup.component';

describe('HomePagePopupComponent', () => {
  let component: HomePagePopupComponent;
  let fixture: ComponentFixture<HomePagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePagePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
