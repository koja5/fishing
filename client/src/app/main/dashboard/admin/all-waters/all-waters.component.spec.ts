import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWatersComponent } from './all-waters.component';

describe('AllWatersComponent', () => {
  let component: AllWatersComponent;
  let fixture: ComponentFixture<AllWatersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWatersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllWatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
