import { Component, HostListener, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
  doc,
  addDoc,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from } from 'rxjs';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  private firestore: Firestore = inject(Firestore);

  isFullScreen: boolean = false;

  customers$: Observable<any[]> = collectionData(
    collection(this.firestore, 'customers'),
    {
      idField: 'uid',
    }
  );

  constructor(public editCustomerDialog: MatDialog) {}

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
    deleteDoc(doc(collection(this.firestore, 'customers'), id));
  }

  async editCustomer(id: string): Promise<void> {
    const docRef = doc(collection(this.firestore, 'customers'), id);
    const docSnap = await getDoc(docRef);

    const editCustomer = this.editCustomerDialog.open(EditCustomerComponent, {
      data: {
        customer: docSnap.data(),
      },
    });

    editCustomer.afterClosed().subscribe((result) => {
      if (result?.name === undefined || result?.status === undefined) return;
      updateDoc(docRef, result);
    });
  }

  addNewCustomer() {
    const addCustomer = this.editCustomerDialog.open(AddCustomerComponent);

    addCustomer.afterClosed().subscribe((result) => {
      console.log(result);

      if (
        result.name === '' ||
        result.projectDesc === '' ||
        result.price === ''
      )
        return;

      addDoc(collection(this.firestore, 'customers'), result);
    });
  }
}
