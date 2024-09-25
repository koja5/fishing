import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBirdCountReportsComponent } from './all-bird-count-reports.component';

describe('AllBirdCountReportsComponent', () => {
  let component: AllBirdCountReportsComponent;
  let fixture: ComponentFixture<AllBirdCountReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBirdCountReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBirdCountReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
