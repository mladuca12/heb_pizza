import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/domain/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  isLoading = false;
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (orders) => {
         this.orders = orders;
         this.isLoading = false;
      },
      error: (e) => console.log(e),
    });
  }
}
