import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent {
  isFullScreen: boolean = false;

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
