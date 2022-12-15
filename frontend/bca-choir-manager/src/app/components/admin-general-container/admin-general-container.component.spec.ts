import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralContainerComponent } from './admin-general-container.component';

describe('AdminGeneralContainerComponent', () => {
  let component: AdminGeneralContainerComponent;
  let fixture: ComponentFixture<AdminGeneralContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGeneralContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGeneralContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
