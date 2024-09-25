import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdDamageComponent } from './bird-damage.component';

describe('BirdDamageComponent', () => {
  let component: BirdDamageComponent;
  let fixture: ComponentFixture<BirdDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
