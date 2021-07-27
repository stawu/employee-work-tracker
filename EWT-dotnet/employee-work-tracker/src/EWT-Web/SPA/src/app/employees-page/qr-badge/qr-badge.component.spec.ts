import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrBadgeComponent } from './qr-badge.component';

describe('QrBadgeComponent', () => {
  let component: QrBadgeComponent;
  let fixture: ComponentFixture<QrBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
