import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdCountComponent } from './bird-count.component';

describe('BirdCountComponent', () => {
  let component: BirdCountComponent;
  let fixture: ComponentFixture<BirdCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
