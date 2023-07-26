import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingWorksComponent } from './pending-works.component';

describe('PendingWorksComponent', () => {
  let component: PendingWorksComponent;
  let fixture: ComponentFixture<PendingWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingWorksComponent]
    });
    fixture = TestBed.createComponent(PendingWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
