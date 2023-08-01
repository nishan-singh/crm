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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MonthlyIncomeComponent } from './components/monthly-income/monthly-income.component';
import { CustomersComponent } from './components/customers/customers.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

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
    MonthlyIncomeComponent,
    CustomersComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

