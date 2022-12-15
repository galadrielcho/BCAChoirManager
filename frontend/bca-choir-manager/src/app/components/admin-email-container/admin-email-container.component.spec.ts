import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailContainerComponent } from './admin-email-container.component';

describe('AdminEmailContainerComponent', () => {
  let component: AdminEmailContainerComponent;
  let fixture: ComponentFixture<AdminEmailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmailContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
