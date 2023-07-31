import { Component, HostListener, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;

  customers$: Observable<any[]> = collectionData(
    collection(this.firestore, 'customers')
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
