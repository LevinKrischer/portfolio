import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowdeskProject } from './flowdesk-project';

describe('FlowdeskProject', () => {
  let component: FlowdeskProject;
  let fixture: ComponentFixture<FlowdeskProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowdeskProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowdeskProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
