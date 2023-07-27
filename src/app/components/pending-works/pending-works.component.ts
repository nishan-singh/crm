import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pending-works',
  templateUrl: './pending-works.component.html',
  styleUrls: ['./pending-works.component.scss'],
})
export class PendingWorksComponent {
  private firestore: Firestore = inject(Firestore);
  pendingWorks$: Observable<any[]>;

  constructor() {
    const pendingWorkRef = collection(this.firestore, 'pending-works');
    this.pendingWorks$ = collectionData(pendingWorkRef) as Observable<any[]>;
  }
}
