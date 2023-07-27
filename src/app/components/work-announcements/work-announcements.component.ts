import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-work-announcements',
  templateUrl: './work-announcements.component.html',
  styleUrls: ['./work-announcements.component.scss'],
})
export class WorkAnnouncementsComponent {
  private firestore: Firestore = inject(Firestore);
  workAnnouncements$: Observable<any[]> = collectionData(
    collection(this.firestore, 'work-announcements')
  );

  constructor() {}
}
