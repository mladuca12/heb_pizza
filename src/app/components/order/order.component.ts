import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/domain/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orderForm: FormGroup;
  isLoading = false;
  isOrderCreationFailed = false;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.formBuilder.group({
      crust: ['', Validators.required],
      flavor: ['', Validators.required],
      size: ['', Validators.required],
      tableNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.orderForm.valid) return;
    this.isLoading = true;
    this.orderService
      .createOrder(
        new Order(
          this.orderForm.value.crust,
          this.orderForm.value.flavor,
          this.orderForm.value.size,
          Number(this.orderForm.value.tableNumber)
        )
      )
      .subscribe({
        next: () => {
         this.isLoading = false;
         this.isOrderCreationFailed = false;
         this.router.navigate(['/orders']);
        },
        error: () => {
          this.isOrderCreationFailed = true;
          this.isLoading = false;
        },
      });
  }
}
