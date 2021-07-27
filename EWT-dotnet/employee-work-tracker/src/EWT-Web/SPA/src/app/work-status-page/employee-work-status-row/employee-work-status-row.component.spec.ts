import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkStatusRowComponent } from './employee-work-status-row.component';

describe('EmployeeWorkStatusRowComponent', () => {
  let component: EmployeeWorkStatusRowComponent;
  let fixture: ComponentFixture<EmployeeWorkStatusRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkStatusRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkStatusRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
