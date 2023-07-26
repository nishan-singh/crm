import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InfoCardsComponent } from './components/info-cards/info-cards.component';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { RunningProjectsComponent } from './components/running-projects/running-projects.component';
import { PendingWorksComponent } from './components/pending-works/pending-works.component';
import { WorkAnnouncementsComponent } from './components/work-announcements/work-announcements.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomepageComponent,
    SidebarComponent,
    InfoCardsComponent,
    UpcomingEventsComponent,
    RunningProjectsComponent,
    PendingWorksComponent,
    WorkAnnouncementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
