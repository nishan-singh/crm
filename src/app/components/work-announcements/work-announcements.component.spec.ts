import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAnnouncementsComponent } from './work-announcements.component';

describe('WorkAnnouncementsComponent', () => {
  let component: WorkAnnouncementsComponent;
  let fixture: ComponentFixture<WorkAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(WorkAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
