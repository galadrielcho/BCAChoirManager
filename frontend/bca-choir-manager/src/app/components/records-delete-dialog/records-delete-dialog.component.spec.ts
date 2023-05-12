import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDeleteDialogComponent } from './records-delete-dialog.component';

describe('RecordsDeleteDialogComponent', () => {
  let component: RecordsDeleteDialogComponent;
  let fixture: ComponentFixture<RecordsDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
