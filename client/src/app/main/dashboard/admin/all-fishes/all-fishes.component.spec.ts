import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AllFishesComponent } from "./all-fishes.component";

describe("FishesComponent", () => {
  let component: AllFishesComponent;
  let fixture: ComponentFixture<AllFishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllFishesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllFishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
