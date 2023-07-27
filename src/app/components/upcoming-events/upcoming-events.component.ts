import { Component, HostListener, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent {
  isFullScreen: boolean = false;
  private firestore: Firestore = inject(Firestore);
  upcomingEvents$: Observable<any[]>;

  constructor() {
    const order = orderBy('startDate');
    const upcomingEventsRef = collection(this.firestore, 'upcoming-events');
    const upcomingEventsQuery = query(upcomingEventsRef, order);
    this.upcomingEvents$ = collectionData(upcomingEventsQuery) as Observable<
      any[]
    >;
  }

  @HostListener('document: keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.isFullScreen = false;
    }
  }

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
  }
}
