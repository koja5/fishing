import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSheetDetailsComponent } from './observation-sheet-details.component';

describe('ObservationSheetDetailsComponent', () => {
  let component: ObservationSheetDetailsComponent;
  let fixture: ComponentFixture<ObservationSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationSheetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
