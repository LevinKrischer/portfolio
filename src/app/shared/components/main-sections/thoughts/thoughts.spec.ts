import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Thoughts } from './thoughts';

describe('Thoughts', () => {
  let component: Thoughts;
  let fixture: ComponentFixture<Thoughts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Thoughts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Thoughts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
