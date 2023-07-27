import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-running-projects',
  templateUrl: './running-projects.component.html',
  styleUrls: ['./running-projects.component.scss'],
})
export class RunningProjectsComponent {
  private firestore: Firestore = inject(Firestore);
  runningProjects$: Observable<any[]>;

  constructor() {
    this.runningProjects$ = collectionData(
      collection(this.firestore, 'running-projects')
    ) as Observable<any[]>;
  }
}
