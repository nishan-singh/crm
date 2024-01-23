import { AsyncPipe, NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-work-announcements',
  standalone: true,
  templateUrl: './work-announcements.component.html',
  styleUrls: ['./work-announcements.component.scss'],
  imports: [NgClass, AsyncPipe]
})
export class WorkAnnouncementsComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;

  workAnnouncements$: Observable<any[]> = collectionData(
    collection(this.firestore, 'work-announcements')
  );

  constructor() {}

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
