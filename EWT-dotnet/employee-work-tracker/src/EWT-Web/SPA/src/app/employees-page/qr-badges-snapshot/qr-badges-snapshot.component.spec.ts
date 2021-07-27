import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrBadgesSnapshotComponent } from './qr-badges-snapshot.component';

describe('QrBadgesSnapshotComponent', () => {
  let component: QrBadgesSnapshotComponent;
  let fixture: ComponentFixture<QrBadgesSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrBadgesSnapshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrBadgesSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
