import { Component, HostListener, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-running-projects',
  templateUrl: './running-projects.component.html',
  styleUrls: ['./running-projects.component.scss'],
})
export class RunningProjectsComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;
  runningProjects$: Observable<any[]>;

  constructor() {
    this.runningProjects$ = collectionData(
      collection(this.firestore, 'running-projects')
    ) as Observable<any[]>;
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
