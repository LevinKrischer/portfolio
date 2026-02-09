import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaBubbleProject } from './da-bubble-project';

describe('DaBubbleProject', () => {
  let component: DaBubbleProject;
  let fixture: ComponentFixture<DaBubbleProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaBubbleProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaBubbleProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
