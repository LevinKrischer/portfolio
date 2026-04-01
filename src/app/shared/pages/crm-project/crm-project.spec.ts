import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmProject } from './crm-project';

describe('CrmProject', () => {
  let component: CrmProject;
  let fixture: ComponentFixture<CrmProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
