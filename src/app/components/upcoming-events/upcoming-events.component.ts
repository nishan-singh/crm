import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
  imports: [NgClass, AsyncPipe, DatePipe]
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
      document.body.style.overflow = 'auto';
      this.isFullScreen = false;
    }
  }

  toggleFullScreen(): void {
    document.body.style.overflow = this.isFullScreen ? 'auto' : 'hidden';
    this.isFullScreen = !this.isFullScreen;
  }
}
