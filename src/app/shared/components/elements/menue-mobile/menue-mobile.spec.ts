import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenueMobile } from './menue-mobile';

describe('MenueMobile', () => {
  let component: MenueMobile;
  let fixture: ComponentFixture<MenueMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenueMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenueMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
