import { Component } from '@angular/core';
import { InfoCardsComponent } from '../info-cards/info-cards.component';
import { UpcomingEventsComponent } from '../upcoming-events/upcoming-events.component';
import { RunningProjectsComponent } from '../running-projects/running-projects.component';
import { PendingWorksComponent } from '../pending-works/pending-works.component';
import { WorkAnnouncementsComponent } from '../work-announcements/work-announcements.component';
import { MonthlyIncomeComponent } from '../monthly-income/monthly-income.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [InfoCardsComponent, UpcomingEventsComponent, RunningProjectsComponent, PendingWorksComponent, WorkAnnouncementsComponent, MonthlyIncomeComponent]
})
export class HomepageComponent {

}
