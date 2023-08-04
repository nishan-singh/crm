import { Component, HostListener, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  private firestore: Firestore = inject(Firestore);
  isFullScreen: boolean = false;
  uniqueId: string = 'uniqueId';

  customers$: Observable<any[]> = collectionData(
    collection(this.firestore, 'customers')
  );

  constructor() {
    this.addCustomer({
      name: 'John Doe',
      age: 30,
      address: '1234 Main St.',
    });
  }

  @HostListener('document: keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      document.body.style.overflow = 'auto';
      this.isFullScreen = false;
    }
  }

  async addCustomer(customerData: any): Promise<string> {
    const collectionRef = collection(this.firestore, 'customers');
    console.log('Document written with ID: ', collectionRef.id);
    return collectionRef.id;
  }

  toggleFullScreen(): void {
    document.body.style.overflow = this.isFullScreen ? 'auto' : 'hidden';
    this.isFullScreen = !this.isFullScreen;
  }

  async deleteCustomer(): Promise<void> {
    const documentRef = doc(
      collection(this.firestore, 'collectionName'),
      this.uniqueId
    );
    await deleteDoc(documentRef);
  }
}
