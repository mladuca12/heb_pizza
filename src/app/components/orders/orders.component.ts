import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  filteredOrders: Order[] = [];
  filter = new FormControl('', { nonNullable: true });

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

  delete(order: Order) {
    this.orderService.deleteOrder(order.id!).subscribe();
    this.orders = this.orders.filter((o) => o.id !== order.id);
    this.filteredOrders = this.filteredOrders.filter((o) => o.id !== order.id);
  }

  filterOrders() {
    this.filteredOrders = this.orders.filter((o) =>
      o.flavor.toLowerCase().includes(this.filter.value.toLowerCase())
    );
  }
}
