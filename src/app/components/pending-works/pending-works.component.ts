import { AsyncPipe, NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pending-works',
  standalone: true,
  templateUrl: './pending-works.component.html',
  styleUrls: ['./pending-works.component.scss'],
  imports: [NgClass, AsyncPipe]
})
export class PendingWorksComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;

  pendingWorks$: Observable<any[]>;

  constructor() {
    const pendingWorkRef = collection(this.firestore, 'pending-works');
    this.pendingWorks$ = collectionData(pendingWorkRef) as Observable<any[]>;
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
