import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProjects } from './navbar-projects';

describe('NavbarProjects', () => {
  let component: NavbarProjects;
  let fixture: ComponentFixture<NavbarProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
