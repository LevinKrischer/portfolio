import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElPolloLocoProject } from './el-pollo-loco-project';

describe('ElPolloLocoProject', () => {
  let component: ElPolloLocoProject;
  let fixture: ComponentFixture<ElPolloLocoProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElPolloLocoProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElPolloLocoProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
