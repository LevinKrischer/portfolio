import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinProject } from './join-project';

describe('JoinProject', () => {
  let component: JoinProject;
  let fixture: ComponentFixture<JoinProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
