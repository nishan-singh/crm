import { AsyncPipe, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject, HostListener } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  orderBy,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  imports: [NgClass, AsyncPipe, DatePipe, CurrencyPipe]
})
export class TransactionsComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;

  transactions$: Observable<any[]>;

  constructor() {
    const order = orderBy('date');
    const upcomingEventsRef = collection(this.firestore, 'transactions');
    const upcomingEventsQuery = query(upcomingEventsRef, order);
    this.transactions$ = collectionData(upcomingEventsQuery, {
      idField: 'uid',
    }) as Observable<any[]>;
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

  delCustomer(id: string): void {
    deleteDoc(doc(collection(this.firestore, 'transactions'), id));
  }
}
