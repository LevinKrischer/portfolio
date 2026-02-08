import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenueService } from './mobile-menue.service';

describe('MobileMenueService', () => {
  let component: MobileMenueService;
  let fixture: ComponentFixture<MobileMenueService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenueService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileMenueService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
