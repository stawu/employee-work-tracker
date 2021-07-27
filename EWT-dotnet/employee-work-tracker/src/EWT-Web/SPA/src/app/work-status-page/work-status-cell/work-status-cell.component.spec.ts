import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStatusCellComponent } from './work-status-cell.component';

describe('WorkStatusCellComponent', () => {
  let component: WorkStatusCellComponent;
  let fixture: ComponentFixture<WorkStatusCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkStatusCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkStatusCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
