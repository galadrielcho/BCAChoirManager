import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpErrorDialogComponent } from './http-error-dialog.component';

describe('HttpErrorDialogComponent', () => {
  let component: HttpErrorDialogComponent;
  let fixture: ComponentFixture<HttpErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpErrorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HttpErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
