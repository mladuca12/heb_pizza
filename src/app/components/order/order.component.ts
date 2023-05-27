import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orderForm: FormGroup;
  isLoading = false;
  isOrderCreationFailed = false;

  constructor(private formBuilder: FormBuilder) {
    this.orderForm = this.formBuilder.group({
      crust: ['', Validators.required],
      flavor: ['', Validators.required],
      size: ['', Validators.required],
      tableNumber: [null, Validators.required],
    });
  }

  onSubmit() {
   if (!this.orderForm.valid) return;
   console.log('submit order');
  }
}
