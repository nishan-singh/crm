import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent {
  statusList: string[] = ['Active', 'Pending', 'Completed', 'Cancelled'];

  addCustomerForm = new FormGroup({
    customerName: new FormControl(''),
    projectDesc: new FormControl(''),
    price: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(private dialogRef: MatDialogRef<AddCustomerComponent>) {}

  onSubmit(value: any) {
    this.dialogRef.close({
      name: value.customerName,
      projectDesc: value.projectDesc,
      price: value.price,
      status: value.status,
    });
  }
}
