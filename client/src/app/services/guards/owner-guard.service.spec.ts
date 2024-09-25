import { TestBed } from "@angular/core/testing";

import { OwnerGuardService } from "./owner-guard.service";

describe("AdminService", () => {
  let service: OwnerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerGuardService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
