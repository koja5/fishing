import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeOfFishesComponent } from './age-of-fishes.component';

describe('AgeOfFishesComponent', () => {
  let component: AgeOfFishesComponent;
  let fixture: ComponentFixture<AgeOfFishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeOfFishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeOfFishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
