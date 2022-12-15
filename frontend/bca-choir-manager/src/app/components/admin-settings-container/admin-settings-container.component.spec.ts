import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingsContainerComponent } from './admin-settings-container.component';

describe('AdminSettingsContainerComponent', () => {
  let component: AdminSettingsContainerComponent;
  let fixture: ComponentFixture<AdminSettingsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSettingsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
