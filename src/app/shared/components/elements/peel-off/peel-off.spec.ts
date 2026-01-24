import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeelOff } from './peel-off';

describe('PeelOff', () => {
  let component: PeelOff;
  let fixture: ComponentFixture<PeelOff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeelOff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeelOff);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
