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
import { updateDoc } from 'firebase/firestore';
import { Observable, from } from 'rxjs';

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
    collection(this.firestore, 'customers'),
    {
      idField: this.uniqueId,
    }
  );

  ids$: Observable<string[]> = from(this.getAllCustomerIds());

  constructor() {}

  async getAllCustomerIds(): Promise<string[]> {
    const querySnapshot = await getDocs(
      collection(this.firestore, 'customers')
    );
    const ids: string[] = [];
    querySnapshot.forEach((doc) => {
      ids.push(doc.id);
    });
    return ids;
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
    // deleteDoc(doc(collection(this.firestore, 'customers'), id));
  }

  editCustomer(id: string): void {
    const customer = doc(collection(this.firestore, 'customers'), id);
    console.log(
      'customer',
      customer,
      'customer.id',
      customer.id,
      'customer.path',
      customer.path
    );

    // updateDoc(customer, { name: 'updated' });
  }
}
