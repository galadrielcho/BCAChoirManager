import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterUpdateComponent } from './roster-update.component';

describe('RosterUpdateComponent', () => {
  let component: RosterUpdateComponent;
  let fixture: ComponentFixture<RosterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
